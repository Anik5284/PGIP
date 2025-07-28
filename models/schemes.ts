import mongoose, { Schema, model, models } from 'mongoose';

const SchemeSchema = new Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Scheme = models.Scheme || model('Scheme', SchemeSchema);
