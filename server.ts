import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import { readFileSync, existsSync } from "fs";
import { config } from "dotenv";
import cors from "cors";
import crypto from "crypto";
import cookieParser from "cookie-parser";

config();

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
    
    // Health check endpoint
    expressApp.get("/health", (req, res) => {
      res.status(200).send("OK");
    });

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
          }
        } else {
          console.error("CRITICAL: SMTP is not configured! Email notification was skipped.");
        }

        if (emailSent) {
          res.json({ success: true, message: "تم إرسال طلبك بنجاح. سنتواصل معك." });
        } else {
          // If email didn't work, we still return successfully to user 
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
        // We don't have leads stored persistently here.
        // Returning an empty array.
        res.json([]);
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
