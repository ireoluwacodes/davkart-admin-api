import { ObjectId } from "mongoose";

export interface IBlog {
  body?: string;
  category?: ObjectId;
  title?: string;
  releaseDate?: Date;
  author?: ObjectId;
  coverPhoto?: string;
  comments: comments;
  _id?: string;
}

interface comment{
    madeBy: String,
    content: String,
    date: Date,
}

interface comments extends comment{
   replies : comment[]
}