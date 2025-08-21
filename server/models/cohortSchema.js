import { model, Schema } from "mongoose";

const cohortSchema = new Schema(
  {
    cohortName: { type: String, required: true, unique: true },
    cohortSlug: { type: String, required: true, unique: true },
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
      default: "Web Dev",
    },
    format: { type: String, enum: ["Part-Time", "Full Time"]},
    campus: {
      type: String,
      enum: ["Paris", "Berlin", "Miami"],
      default: "Berlin",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    inProgress: { type: Boolean, default: false },
    programManager: {
      type: String,
      enum: ["Sally Daher", "Alice Williams", "Charlie Brown", "Eva Edwards"],
      default: "Sally Daher",
      required: true,
    },
    leadTeacher: {
      type: String,
      enum: ["Florian Aube", "Bob Johnson", "Eva Edwards", "Frank Foster"],default: "Bob Johnson",
      required: true,
    },
    totalHours: { type: Number, max: 360 },
  },
  { timestamps: true }
);
export default model("Cohort", cohortSchema);
