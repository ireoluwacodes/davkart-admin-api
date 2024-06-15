import { object, ObjectSchema, string } from "joi";

export const createCategorySchema: ObjectSchema = object({
  fullName: string().required(),
  email: string().required(),
  password: string().required(),
});

