import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON
  app.use(express.json());

  // API Route - Simulating contact form submission
  app.post("/api/contact", (req, res) => {
    const { name, phone, message } = req.body;
    console.log("Contact Request Received:", { name, phone, message });
    // In a real standalone app, you might save this to a database or send an email
    res.json({ success: true, message: "تم استلام طلبك بنجاح. سنتواصل معك في أقرب وقت." });
  });

  if (process.env.NODE_ENV !== "production") {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static file serving for production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Standalone Site Running at http://localhost:${PORT}`);
  });
}

startServer();
