import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface CheckDocumentType extends Document {
  message: string;
  sentAt: Date;
}

const CheckDocumentSchema = new Schema<CheckDocumentType>({
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const CheckDocument =
  models.CheckDocument || model<CheckDocumentType>('CheckDocument', CheckDocumentSchema);

export default CheckDocument;
