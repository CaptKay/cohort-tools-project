import { Router } from "express";
import StudentModel from "../models/studentsSchema.js";
import CohortModel from "../models/cohortSchema.js";

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const studentData = await StudentModel.create(req.body);
    await CohortModel.findByIdAndUpdate(studentData.cohort, {
      $push: { students: studentData },
    });

    return res
      .status(201)
      .json({ msg: "Student created succesfully", student: studentData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error creating student", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const studentData = await StudentModel.find().populate("cohort");
    return res.status(200).json(studentData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error getting all students", error });
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await StudentModel.findById(studentId).populate("cohort");
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return req.status(500).json({ msg: "Error fetching the student", error });
  }
});

router.put("/update/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error updating the student", error });
  }
});

router.delete("/delete/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    await CohortModel.findByIdAndUpdate(student.cohort, {
      $pull: { students: studentId },
    });

    const deletedStudent = await StudentModel.findByIdAndDelete(studentId);
    return res
      .status(200)
      .json({ msg: "Student deleted successfully.", deletedStudent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error deleting the Student", error });
  }
});
router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const foundCohort = await CohortModel.findById(
      req.params.cohortId
    ).populate("students");
    res.status(200).json(foundCohort);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error getting the Student", error });
  }
});
export default router;
