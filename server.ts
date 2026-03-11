import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to proxy the chat request (bypasses CORS and adblockers)
  app.post("/api/chat", async (req, res) => {
    try {
      const response = await fetch('https://n8n.srv1202174.hstgr.cloud/webhook/58fce02b-5157-4f02-a652-0ff5eaba59c2/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(req.body)
      });

      const contentType = response.headers.get('content-type');
      const text = await response.text();

      if (!response.ok) {
        console.error(`n8n error: ${response.status} ${text}`);
        return res.status(response.status).send(text);
      }

      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      res.send(text);
    } catch (error) {
      console.error('Error proxying chat request:', error);
      res.status(500).json({ error: 'Failed to proxy request' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
