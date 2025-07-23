import mongoose, { Schema, models, Document as MongooseDocument } from "mongoose";

interface DocumentFile {
  name: string;
  mimetype: string;
  size: number;
  url?: string; // If you store file URLs (e.g., S3, local path)
}

export interface IUserDocument extends MongooseDocument {
  userId: string;
  documents: {
    [key: string]: DocumentFile | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

const DocumentFileSchema = new Schema<DocumentFile>(
  {
    name: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String }, // Optional: for file storage location
  },
  { _id: false }
);

const UserDocumentSchema = new Schema<IUserDocument>(
  {
    userId: { type: String, required: true, index: true },
    documents: {
      type: Map,
      of: DocumentFileSchema,
      default: {},
    },
  },
  { timestamps: true }
);

const UserDocument =
  models.UserDocument || mongoose.model<IUserDocument>("UserDocument", UserDocumentSchema);

export default UserDocument;