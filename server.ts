import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { readFileSync, existsSync } from "fs";
import { config } from "dotenv";
import cors from "cors";
import crypto from "crypto";
import cookieParser from "cookie-parser";

config();

// Helper to hash data for TikTok (SHA-256)
function sha256(data: string) {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

// Normalize phone to TikTok format (Digits only, including country code, no leading zeros or plus)
function normalizePhone(phone: string) {
  let cleaned = phone.replace(/\D/g, "");
  // If it starts with 05 (local Saudi), replace 0 with 966
  if (cleaned.startsWith("05") && cleaned.length === 10) {
    return "966" + cleaned.substring(1);
  }
  // If it starts with 5 (local Saudi without zero), add 966
  if (cleaned.startsWith("5") && cleaned.length === 9) {
    return "966" + cleaned;
  }
  // If it already has 966, ensure it's just digits
  if (cleaned.startsWith("966")) {
    return cleaned;
  }
  return cleaned; // Fallback
}

// TikTok CAPI Function
async function sendTikTokEvent(event: string, userData: { phone?: string; email?: string; pageUrl?: string }, req: express.Request, eventId?: string) {
  // Use environment variables if set, otherwise fallback to the provided IDs
  const pixelId = process.env.TIKTOK_PIXEL_ID || "D84DP5BC77U6NFPBOU0G";
  // Fallback to the token shown in user's recent screenshot (Image 8)
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN || "f97f9bce19dde4c92414f2c5b18b655f40811dc0";

  if (!pixelId || !accessToken) {
    console.log("TikTok Pixel ID or Access Token missing, skipping CAPI event.");
    return;
  }

  // Extract client IP and OS info
  const clientIp = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "").split(',')[0].trim();
  const userAgent = req.headers["user-agent"] || "";
  
  // Use pageUrl from client if provided, otherwise fallback to referer or constructed URL
  const currentUrl = userData.pageUrl || req.headers.referer || "https://adel-loans.com";
  
  // Get _ttp cookie from request
  const ttp = (req as any).cookies?._ttp || "";

  // Get test event code from request query or body
  // Try body first (from fetch inside App.tsx), then query (for manual testing)
  const testEventCode = (req.body.test_event_code as string) || (req.query.test_event_code as string);

  const payload = {
    event: event,
    event_id: eventId || `event_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    event_time: Math.floor(Date.now() / 1000),
    context: {
      ad: {
        callback: req.query.ttclid as string || (req.body.ttclid as string)
      },
      user: {
        phone_sha256: userData.phone ? sha256(normalizePhone(userData.phone)) : undefined,
        email_sha256: userData.email ? sha256(userData.email) : undefined,
        ip_address: clientIp,
        user_agent: userAgent,
        ttp: ttp
      },
      page: {
        url: currentUrl
      }
    }
  };

  try {
    const requestBody = {
      pixel_code: pixelId,
      pixel_id: pixelId,
      events: [payload],
      test_event_code: testEventCode 
    };

    console.log(`[TikTok CAPI] Preparing to send ${event} for pixel ${pixelId}`);
    if (testEventCode) console.log(`[TikTok CAPI] Using Test Code: ${testEventCode}`);

    const response = await fetch(`https://business-api.tiktok.com/open_api/v1.3/event/track/`, {
      method: "POST",
      headers: {
        "Access-Token": accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    const result = await response.json();
    console.log(`[TikTok CAPI] Response for ${event}:`, JSON.stringify(result, null, 2));
    
    if (result.code !== 0) {
      console.error(`[TikTok CAPI] Error: ${result.message}`);
    }
  } catch (error) {
    console.error(`Error sending TikTok CAPI event (${event}):`, error);
  }
}

// Initialize Firebase
let firebaseConfig;
try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  console.log("Reading firebase config from:", configPath);
  firebaseConfig = JSON.parse(readFileSync(configPath, "utf-8"));
} catch (error) {
  console.error("Critical error reading firebase-applet-config.json:", error);
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Email Transporter
let transporter: nodemailer.Transporter | null = null;
const getTransporter = () => {
  if (!transporter) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP settings missing, email notifications disabled.");
      return null;
    }
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

async function startServer() {
  try {
    const expressApp = express();
    const PORT = 3000;

    // Middleware
    expressApp.use(cors()); // Allow all origins for the API to work across domains
    expressApp.use(express.json());
    expressApp.use(cookieParser());

    // API Route - Handling contact form submission
    expressApp.post("/api/contact", async (req, res) => {
      console.log("--- CONTACT API CALLED ---", req.body);
      try {
        const { fullName, phone, bankType, salary, message, eventId } = req.body;
        
        if (!fullName || !phone || !bankType || !salary) {
            console.error("Missing required fields", req.body);
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        console.log("Contact Request Processing:", { fullName, phone, bankType, salary, message, eventId });

        // 1. Save to Firestore
        await addDoc(collection(db, "requests"), {
          fullName,
          phone,
          bankType,
          salary,
          message,
          createdAt: new Date().toISOString(),
          eventId: eventId || null
        });

        // 2. Track TikTok Events (Server-side)
        // Fire and forget to avoid delaying the response
        // We send multiple events to help the vertical funnel optimization
        const leadEvents = ["CompleteRegistration", "Contact", "Purchase"];
        const pageUrl = (req.body.pageUrl as string) || req.headers.referer;
        leadEvents.forEach(evt => {
          sendTikTokEvent(evt, { phone, pageUrl }, req, eventId).catch(err => console.error(`TikTok Event Error (${evt}):`, err));
        });

        // 3. Send Email
        const transporter = getTransporter();
        let emailSent = false;
        if (transporter) {
          console.log("Attempting to send email via SMTP, user:", process.env.SMTP_USER);
          try {
            await transporter.sendMail({
              from: `"موقع عادل" <${process.env.SMTP_USER}>`, 
              to: process.env.SMTP_USER, 
              subject: "طلب تواصل جديد من موقع عادل لتسديد القروض", 
              text: `تنبيه: طلب جديد وصل للموقع\n\nاسم العميل: ${fullName}\nرقم الجوال: ${phone}\nنوع البنك: ${bankType}\nالراتب: ${salary}\nالرسالة: ${message}`, 
              replyTo: phone,
            });
            emailSent = true;
            console.log("Email sent successfully!");
          } catch (mailError) {
            console.error("Failed to send email via SMTP:", mailError);
            // We still have the data in Firestore, but notice the failure
          }
        } else {
          console.error("CRITICAL: SMTP is not configured! Email notification was skipped.");
        }

        if (emailSent) {
          res.json({ success: true, message: "تم إرسال طلبك بنجاح. سنتواصل معك." });
        } else {
          // If Firestore worked but email didn't, we still return successfully to user 
          res.json({ 
            success: true, 
            message: "تم استلام طلبك بنجاح (تنبيه: تعذر إرسال الإشعار البريدي حالياً ولكن طلبك محفوظ).",
          });
        }
      } catch (error) {
        console.error("Error processing contact form:", error);
        res.status(500).json({ success: false, message: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً." });
      }
    });

    // Check SMTP on startup
    const t = getTransporter();
    if (t) {
      t.verify((error) => {
        if (error) {
          console.error("SMTP Verification Error:", error);
        } else {
          console.log("SMTP Server is ready to take our messages");
        }
      });
    }

    if (process.env.NODE_ENV !== "production") {
      // Vite middleware for development
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      expressApp.use(vite.middlewares);
    } else {
      // Static file serving for production
      const distPath = path.join(process.cwd(), "dist");
      expressApp.use(express.static(distPath));
      expressApp.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    expressApp.listen(PORT, "0.0.0.0", () => {
      console.log(`Standalone Site Running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
