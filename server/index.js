require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const connectDB = require("./config/db");
const { initializeSocketHandlers } = require("./config/socket");
const { initializeNotifications } = require("./config/notifications");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Serve static files from frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));
app.use("/api/recommend", require("./routes/recommendationRoutes"));

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// Initialize Socket.IO handlers and notifications
initializeSocketHandlers(io);
initializeNotifications(io);

// Make io accessible to routes
app.set("io", io);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    connectedClients: io.engine.clientsCount,
  });
});

// Development/test endpoint to emit a Socket.IO notification
// Usage: GET /api/test/notify?message=Hello&title=Hi&type=info
app.get("/api/test/notify", (req, res) => {
  try {
    const ioInstance = req.app.get("io");
    if (!ioInstance) {
      return res.status(500).json({ success: false, error: "Socket.IO not initialized" });
    }

    const payload = {
      title: req.query.title || "Test Notification",
      message: req.query.message || "This is a test notification from the server",
      type: req.query.type || "info",
      timestamp: new Date(),
    };

    // Emit to all connected clients
    ioInstance.sockets.emit("test_notification", payload);
    console.log("Emitted test_notification", payload);

    return res.json({ success: true, emitted: payload });
  } catch (err) {
    console.error("Error emitting test notification:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

// Development/test endpoint to emit a burst of different Socket.IO notifications
// Usage: GET /api/test/notify-burst?count=1
app.get("/api/test/notify-burst", (req, res) => {
  try {
    const ioInstance = req.app.get("io");
    if (!ioInstance) {
      return res.status(500).json({ success: false, error: "Socket.IO not initialized" });
    }

    const count = Math.max(1, Math.min(10, parseInt(req.query.count || "1", 10)));
    const emitted = [];

    for (let i = 0; i < count; i++) {
      const base = {
        id: `burst_${Date.now()}_${i}`,
        timestamp: new Date(),
      };

      // test_notification
      const testPayload = Object.assign({}, base, {
        title: `Burst Test #${i + 1}`,
        message: `This is burst test notification #${i + 1}`,
        type: "info",
      });
      ioInstance.sockets.emit("test_notification", testPayload);
      emitted.push({ event: "test_notification", payload: testPayload });

      // price_drop_alert
      const priceDrop = Object.assign({}, base, {
        productId: `p_${i + 1}`,
        title: `Price drop: Product ${i + 1}`,
        message: `Price dropped by ${(5 + i)}% — check it out!`,
        type: "price_drop",
        oldPrice: 100 + i * 10,
        newPrice: 90 + i * 9,
      });
      ioInstance.sockets.emit("price_drop_alert", priceDrop);
      emitted.push({ event: "price_drop_alert", payload: priceDrop });

      // order_status_updated
      const orderUpdate = Object.assign({}, base, {
        orderId: `ord_${i + 1}`,
        title: `Order Updated #${i + 1}`,
        message: `Order ord_${i + 1} status changed to Shipped`,
        status: "Shipped",
        type: "order",
      });
      ioInstance.sockets.emit("order_status_updated", orderUpdate);
      emitted.push({ event: "order_status_updated", payload: orderUpdate });

      // new_vendor_added
      const vendorAdded = Object.assign({}, base, {
        vendorId: `vendor_${i + 1}`,
        title: `New Vendor #${i + 1}`,
        message: `Vendor vendor_${i + 1} has joined the platform`,
        type: "vendor",
      });
      ioInstance.sockets.emit("new_vendor_added", vendorAdded);
      emitted.push({ event: "new_vendor_added", payload: vendorAdded });
    }

    console.log(`Emitted ${emitted.length} burst notifications`);
    return res.json({ success: true, emittedCount: emitted.length, emitted });
  } catch (err) {
    console.error("Error emitting burst notifications:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║  ✔ VendorLink Server Running           ║`);
  console.log(`║  Port: ${PORT}                              ║`);
  console.log(`║  Socket.IO: Enabled                    ║`);
  console.log(`║  Notifications: Active                 ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
});
