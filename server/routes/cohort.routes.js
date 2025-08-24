import { Router } from "express";
import CohortModel from "../models/cohortSchema.js";

const router = Router();

router.post("/create", async (req, res) => {
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

router.get("/all", async (req, res) => {
  try {
    const cohortData = await CohortModel.find();
    return res.status(200).json(cohortData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error getting all cohorts", error });
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const cohort = await CohortModel.findById(cohortId);
    return res.status(200).json(cohort);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error fetching the cohort", error });
  }
});

router.put("/update/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const updatedCohort = await CohortModel.findByIdAndUpdate(
      cohortId,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedCohort);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error updating the cohort", error });
  }
});

router.delete("/delete/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const deletedCohort = await CohortModel.findByIdAndDelete(cohortId);
    return res
      .status(200)
      .json({ msg: "Cohort deleted successfully.", deletedCohort});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error deleting the cohort", error });
  }
});

export default router;
