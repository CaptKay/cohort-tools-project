//const express = require("express");
//const morgan = require("morgan");
//const cookieParser = require("cookie-parser");
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";

import cohortRoute from "./routes/cohort.routes.js";
import studentRoute from "./routes/student.routes.js";

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
dotenv.config();
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5005"],
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

// Routes
app.use("/api/v1/cohorts", cohortRoute);
app.use("/api/v1/students", studentRoute);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  connectDB();
});
