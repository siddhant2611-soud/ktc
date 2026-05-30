import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Endpoint to handle the contact/quote form submissions
  app.post("/api/quote", async (req, res) => {
    try {
      const { pickup, drop, phone, vehicle, material } = req.body;
      
      console.log("New Quote Request Received:", {
        pickup,
        drop,
        phone,
        vehicle,
        material,
        timestamp: new Date().toISOString()
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      res.status(200).json({ 
        success: true, 
        message: "Quote request received successfully. Our team will contact you shortly." 
      });
    } catch (error) {
      console.error("Error processing quote request:", error);
      res.status(500).json({ success: false, message: "Failed to process quote request." });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      console.log("Newsletter Subscription:", { email, timestamp: new Date().toISOString() });
      await new Promise(resolve => setTimeout(resolve, 500));
      res.status(200).json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to subscribe." });
    }
  });

  app.get("/api/track/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Tracking request for: ${id}`);
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
      res.status(500).json({ success: false, message: "Failed to fetch tracking data." });
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
