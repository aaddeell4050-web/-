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
    const portEnv = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const PORT = isNaN(portEnv) ? 3000 : portEnv;

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

        // 2. Send Email
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

    // API Route - Get all leads (Secured by a simple check or just public for now for dev)
    expressApp.get("/api/leads", async (req, res) => {
      try {
        const { getDocs, query, orderBy } = await import("firebase/firestore");
        const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const leads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(leads);
      } catch (error) {
        console.error("Error fetching leads:", error);
        res.status(500).json({ success: false, message: "Failed to fetch leads" });
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

    const serverInstance = expressApp.listen(PORT, "0.0.0.0", () => {
      console.log(`Standalone Site Running on port ${PORT}`);
    });
    console.log("Server listening call completed successfully.");
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
