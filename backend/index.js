require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const registerRouter = require("./Router/registerRouter");
const classRouter = require("./Router/classRouter");
const contactRouter = require("./Router/contactRouter");
const attendanceRouter = require("./Router/attendanceRouter");
const hackathonRouter = require("./Router/hackathonRouter");
const registrationRouter = require("./Router/registrationRouter");
const alumniRouter = require("./Router/alumniRouter");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/elivateacademy";
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "https://elivateacademy.com,https://www.elivateacademy.com,http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", registerRouter);
app.use("/api", classRouter);
app.use("/api", contactRouter);
app.use("/api", attendanceRouter);
app.use("/api", hackathonRouter);
app.use("/api", registrationRouter);
app.use("/api", alumniRouter);

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB: ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
