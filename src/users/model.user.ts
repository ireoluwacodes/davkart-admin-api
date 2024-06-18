import { model, Schema } from "mongoose";
import { IUser } from "./interface.user";

// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
  avatar: {
    type: String,
  },
  gender: {
    type: String,
  },
  refreshValidTill: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["admin", "author"],
    default : "author",
    required: true,
  },
});

//Export the model
export const User = model("User", userSchema);
