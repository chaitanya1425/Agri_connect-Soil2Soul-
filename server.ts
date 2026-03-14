import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "AgriConnect Backend is running" });
  });

  // Example API for Market Prices (Mocked for now, could be real API)
  app.get("/api/market-prices", (req, res) => {
    res.json([
      { crop: "Wheat", price: "2200", unit: "Quintal", trend: "up" },
      { crop: "Rice", price: "1800", unit: "Quintal", trend: "down" },
      { crop: "Tomato", price: "40", unit: "kg", trend: "up" },
      { crop: "Onion", price: "25", unit: "kg", trend: "stable" },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
