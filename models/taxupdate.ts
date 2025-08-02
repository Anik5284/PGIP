import mongoose, { Schema, Document } from 'mongoose';

export interface ITaxUpdate extends Document {
  message: string;
  updatedAt: Date;
}

const TaxUpdateSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // timestamps adds createdAt and updatedAt

export default mongoose.models.TaxUpdate || mongoose.model<ITaxUpdate>('TaxUpdate', TaxUpdateSchema);