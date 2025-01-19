const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const channelRoutes = require("./Routes/channelRoutes");
const videoRoutes = require("./Routes/videoRoutes");
require("dotenv").config();


mongoose.connect("mongodb://localhost:27017/youtube");
const db = mongoose.connection;
db.on("open", ()=>{
    console.log("Connection to db successful");
})

db.on("error", ()=>{
    console.log("Connection to db not successful");
})

const app = express();
app.use(express.json());
app.listen(1000, ()=>{
    console.log("Server running on port 1000");
})

app.use("/user", userRoutes);
app.use("/channel", channelRoutes);
app.use("/video", videoRoutes);