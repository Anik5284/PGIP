import mongoose, { Schema, models, Document } from "mongoose";

export interface IAdminAlert extends Document {
  title: string;
  description: string;
  createdAt: Date;
  userId?: string; // optional: send to specific user
}

const AdminAlertSchema = new Schema<IAdminAlert>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: false },
});

const AdminAlert =
  models.AdminAlert || mongoose.model("AdminAlert", AdminAlertSchema);

export default AdminAlert;
