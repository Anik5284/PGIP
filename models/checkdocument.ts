import mongoose, { Schema, Document } from 'mongoose';

export interface ICheckDocument extends Document {
  message: string;
  sentAt: Date;
}

const CheckDocumentSchema = new Schema<ICheckDocument>({
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

const CheckDocument =
  mongoose.models.CheckDocument ||
  mongoose.model<ICheckDocument>('CheckDocument', CheckDocumentSchema);

export default CheckDocument;
