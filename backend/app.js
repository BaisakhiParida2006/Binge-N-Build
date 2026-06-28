const authRoutes = require("./route/authRoutes.js");
const transactionRoutes = require("./route/transactionRoutes.js");
const merchantRoutes = require("./route/merchantRoutes.js");
const subscriptionRoutes = require("./route/subscriptionRoutes.js");
const dashboardRoutes = require("./route/dashboardRoutes.js");
const warningRoutes = require("./route/warningRoutes.js");
const uploadRoutes = require("./route/csvroutes.js");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/merchant", merchantRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/warnings",warningRoutes);
app.use("/api/upload", uploadRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Subscription Guardian Backend Running 🚀"
    });
});

module.exports = app;

