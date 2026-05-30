import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import winston from "winston";

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Endpoint to handle the contact/quote form submissions
  app.post("/api/quote", async (req, res) => {
    try {
      const { pickup, drop, phone, vehicle, material } = req.body;
      
      logger.info("New Quote Request Received", {
        pickup,
        drop,
        phone,
        vehicle,
        material
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      res.status(200).json({ 
        success: true, 
        message: "Quote request received successfully. Our team will contact you shortly." 
      });
    } catch (error) {
      logger.error("Error processing quote request", { error });
      res.status(500).json({ success: false, message: "Failed to process quote request." });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      logger.info("Newsletter Subscription", { email });
      await new Promise(resolve => setTimeout(resolve, 500));
      res.status(200).json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
      logger.error("Error processing newsletter subscription", { error });
      res.status(500).json({ success: false, message: "Failed to subscribe." });
    }
  });

  app.get("/api/track/:id", async (req, res) => {
    try {
      const { id } = req.params;
      logger.info(`Tracking request for`, { trackingId: id });
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Send mock tracking data
      res.status(200).json({
        success: true,
        data: {
          trackingId: id.toUpperCase(),
          status: "In Transit",
          estimatedDelivery: "Tomorrow, 2 PM",
          origin: "Mumbai Depot",
          destination: "Noida Facility",
          currentLocation: "Indore Checkpost"
        }
      });
    } catch (error) {
      logger.error("Error fetching tracking data", { error });
      res.status(500).json({ success: false, message: "Failed to fetch tracking data." });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ success: false, message: "Chat is currently unavailable. Please check back later." });
      }

      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey });

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "You are a helpful customer service AI assistant for KTC (Kaushik Transport Company), a logistics and freight transport company. You help answer basic logistics inquiries based on the company services: Road Freight Transport, Commercial Goods, Industrial Heavy Lifting, B2B Supply Chain, Local Distribution, and Interstate Logistics. You do NOT provide exact prices or real tracking updates over chat. If a user asks for a quote, redirect them to the Check Cost / Get Quote form. If they want tracking, redirect them to the Online Tracking section. Keep responses concise, polite, and professional. Start the conversation right away.",
        },
      });

      // Simple implementation: Instead of sending history properly which might be complex, we just send message and contextualize it.
      // Or to send history, we could map it if we really want. 
      // But actually we can just format the history into the prompt string.
      const promptText = `Previous conversation:\n${history.map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n')}\n\nUser: ${message}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          systemInstruction: "You are a helpful customer service AI assistant for KTC (Kaushik Transport Company), a logistics and freight transport company. You help answer basic logistics inquiries based on the company services: Road Freight Transport, Commercial Goods, Industrial Heavy Lifting, B2B Supply Chain, Local Distribution, and Interstate Logistics. You do NOT provide exact prices or real tracking updates over chat. If a user asks for a quote, redirect them to the Check Cost / Get Quote form. If they want tracking, redirect them to the Online Tracking section. Keep responses concise, polite, and professional.",
        }
      });

      res.status(200).json({ success: true, text: response.text });
    } catch (error) {
      logger.error("Error in chat endpoint", { error });
      res.status(500).json({ success: false, message: "Failed to generate response." });
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
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
