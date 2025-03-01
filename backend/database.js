const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const channelRoutes = require("./Routes/channelRoutes");
const videoRoutes = require("./Routes/videoRoutes");
const searchRoutes = require("./Routes/searchRoutes");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");

// mongoose.connect("mongodb://localhost:27017/youtube");
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("open", () => {
  console.log("Connection to db successful");
});

db.on("error", () => {
  console.log("Connection to db not successful");
});

const app = express();
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ["https://pikatube.vercel.app", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.listen(process.env.PORT, () => {
  console.log("Server running on port ", process.env.PORT);
});

app.use("/user", userRoutes);
app.use("/channel", channelRoutes);
app.use("/video", videoRoutes);
app.use("/search",searchRoutes);

app.post("/validate-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Token is valid.",
      isValid: true,
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
      isValid: false,
    });
  }
});
