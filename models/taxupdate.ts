import mongoose, { Schema, Document, models, model } from "mongoose";

// Interface for a Tax Update document
export interface ITaxUpdate extends Document {
  title: string;
  message: string;
  createdAt: Date;
}

// Mongoose Schema for Tax Updates
const TaxUpdateSchema: Schema = new Schema(
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
    timestamps: true,
  }
);

// Create or use the existing model, creating a 'taxupdates' collection in MongoDB
export const TaxUpdate =
  models.TaxUpdate || model<ITaxUpdate>("TaxUpdate", TaxUpdateSchema);