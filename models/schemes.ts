import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IScheme extends Document {
  message: string;
  sentAt: Date;
}

const schemeSchema = new Schema<IScheme>(
  {
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // ensures createdAt is available
);

export const Scheme = models.Scheme || model<IScheme>('Scheme', schemeSchema);
