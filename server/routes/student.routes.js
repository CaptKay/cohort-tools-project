import { Router } from "express";
import StudentModel from "../models/studentsSchema.js";

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const studentData = await StudentModel.create(req.body);
    return res
      .status(201)
      .json({ msg: "Student created succesfully", student: studentData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "error creating student", error: error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const studentData = await StudentModel.find();
    return res.status(200).json(studentData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error getting all students", error });
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await StudentModel.findById(studentId);
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return req.status(500).json({ msg: "Error fetching the student", error });
  }
});

export default router;
