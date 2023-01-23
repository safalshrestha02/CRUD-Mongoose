require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const userRoutes = require("./routes/getUsers");
const connectDB = require("./config/connect");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use("/users", userRoutes);

app.get("/", (req, res, next) => {
  //  console.log(users);
  res.send("hello");
});

mongoose.connection.once("open", () => {
  app.listen(3100, () => {
    console.log("Server running on port 3100");
  });
});
