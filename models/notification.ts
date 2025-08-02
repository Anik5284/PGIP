import mongoose, { Schema, Document, models, model } from "mongoose";

// 1. Define Notification Interface
export interface INotification extends Document {
  title: string;
  message: string;
  createdAt: Date;
}

// 2. Define Mongoose Schema
const NotificationSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// 3. Create or Use Existing Model
export const Notification =
  models.Notification || model<INotification>("Notification", NotificationSchema);
