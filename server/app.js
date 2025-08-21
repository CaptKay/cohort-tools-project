//const express = require("express");
//const morgan = require("morgan");
//const cookieParser = require("cookie-parser");
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.config.js"
import CohortModel from "./models/cohortSchema.js"
import StudentModel from "./models/studentsSchema.js"
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/cohorts", async (req, res) => {
  try {
    const cohortData = await CohortModel.find();
    return res.status(200).json(cohortData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error getting all cohorts", error });
  }
});
app.get("/students", async (req, res) => {
  try {
    const studentData = await StudentModel.find();
    return res.status(200).json(studentData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error getting all students", error });
  }
});

app.post("/cohorts", async (req, res) => {
  try {
    const cohortData = await CohortModel.create(req.body);
    return res
      .status(201)
      .json({ msg: "Cohort created succesfully", cohort: cohortData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error creating cohort", error: error });
  }
});
app.post("/students", async (req, res) => {
  try {
    const studentData = await StudentModel.create(req.body);
    return res
      .status(201)
      .json({ msg: "Student created succesfully", student: studentData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error creating student", error: error });
  }
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDB()
});