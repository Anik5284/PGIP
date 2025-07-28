import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IMessage extends Document {
  message: string;
  sentAt: Date;
}

const messageSchema = new Schema<IMessage>({
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite in dev/hot-reload
export const MessageModel =
  models.Message || model<IMessage>('Message', messageSchema);
