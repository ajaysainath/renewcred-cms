const standardRoutes = require("./routes/standards.routes");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/standards", standardRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RenewCred CMS Backend Running 🚀",
  });
});
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = app;