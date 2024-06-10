import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

// Declare the Schema of the Mongo model
const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  body: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      madeBy: String,
      content: String,
      date: Date,
      replies: [
        {
          madeBy: String,
          content: String,
          date: Date,
        },
      ],
    },
  ],
});

//Export the model
export const Blog = model("Blog", blogSchema);
