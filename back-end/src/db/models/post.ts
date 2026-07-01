import mongoose, { Schema } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  author?: string;
  contents?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
  },
  { timestamps: true },
);

export const Post = mongoose.model<IPost>("post", postSchema);
