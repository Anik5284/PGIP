import mongoose, { Schema, Document, Model, models } from "mongoose";

// 1. Define TypeScript interface for Feedback
export interface IFeedback extends Document {
  userId?: string;
  message: string;
  createdAt: Date;
}

// 2. Define the Mongoose schema
const FeedbackSchema: Schema<IFeedback> = new Schema(
  {
    userId: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// 3. Export the model
const Feedback: Model<IFeedback> =
  models.Feedback || mongoose.model<IFeedback>("Feedback", FeedbackSchema);

export default Feedback;
