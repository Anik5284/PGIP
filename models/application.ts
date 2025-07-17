import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    name: String,
    fatherName: String,
    motherName: String,
    dob: String,
    place: String,
    qualification: String,
    state: String,
    religion: String,
    tenthMarks: String,
    twelfthMarks: String,
    graduationMarks: String,
    gender: String,
    cast: String,
    phone: String,
    email: String,
    disability: String,
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model("Application", applicationSchema);
