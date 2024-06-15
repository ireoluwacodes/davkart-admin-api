import { object, ObjectSchema, string } from "joi";

export const createBlogSchema: ObjectSchema = object({
  fullName: string().required(),
  email: string().required(),
  password: string().required(),
});

