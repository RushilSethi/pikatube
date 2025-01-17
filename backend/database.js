const express = require("express");
const mongoose = require("mongoose");


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
app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})