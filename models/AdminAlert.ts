import mongoose, { Schema, models, Document } from "mongoose";

export interface IAdminAlert extends Document {
  title: string;
  description: string;
  createdAt: Date;
  userId?: string;
}

const AdminAlertSchema = new Schema<IAdminAlert>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: false, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const AdminAlert =
  models.AdminAlert || mongoose.model<IAdminAlert>("AdminAlert", AdminAlertSchema);

export default AdminAlert;
