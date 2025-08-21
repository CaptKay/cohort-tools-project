import mongoose, { model, Schema } from "mongoose";
const studentsSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    linkedinUrl: { type: String, required: true, unique: true },
    languages: { type: [String] },
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
      default: "Web Dev",
    },
    background: { type: String },
    image: { type: String },
    projects: { type: [String] },
    cohort: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cohort" },
  },

  { timestamps: true }
);
export default model("Student", studentsSchema);
