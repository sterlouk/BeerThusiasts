import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import beersRoutes from "./routes/beers.js";
import brandsRoutes from "./routes/brands.js";
import reviewsRoutes from "./routes/reviews.js";
import ordersRoutes from "./routes/orders.js";
import pubsRoutes from "./routes/pubs.js";
import adminRoutes from "./routes/admin.js";
import path from "path";

dotenv.config();

const app = express();

// Only the configured frontend origin may call the API from a browser
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "100kb" }));
app.disable("x-powered-by");

app.use("/api/beers", beersRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/pubs", pubsRoutes);
app.use("/api/admin", adminRoutes);

// Serve uploaded beer images from /images/beers
app.use(
  "/images/beers",
  express.static(path.join(process.cwd(), "public", "images", "beers"), {
    setHeaders: (res) => res.setHeader("X-Content-Type-Options", "nosniff"),
  })
);

// API_PORT rather than PORT, to avoid collisions with a generic PORT env var
const PORT = Number(process.env.API_PORT) || 5001;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

