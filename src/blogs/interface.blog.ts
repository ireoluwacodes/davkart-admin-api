import { ObjectId } from 'mongoose';

export interface IBlog {
  body?: string;
  category?: ObjectId;
  title?: string;
  status?: string;
  releaseDate?: Date;
  author?: ObjectId;
  coverPhoto?: string;
  comments: comments;
  _id?: string;
}

interface comment {
  madeBy: string;
  content: string;
  date: Date;
}

interface comments extends comment {
  replies: comment[];
}
