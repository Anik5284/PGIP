// models/application.js
import mongoose, { Schema, models } from "mongoose";

const applicationSchema = new Schema({
  name: String,
  fatherName: String,
  motherName: String,
  dob: Date,
  place: String,
  qualification: String,
  state: String,
  religion: String,
  tenthMarks: Number,
  twelfthMarks: Number,
  graduationMarks: Number,
  gender: String,
  cast: String,
  phone: String,
  email: String,
  disability: String,
}, { timestamps: true });

const Application = models.Application || mongoose.model("Application", applicationSchema);
export default Application;
