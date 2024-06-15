import { object, ObjectSchema, string } from "joi";

export const createUserSchema: ObjectSchema = object({
  fullName: string().required(),
  email: string().required(),
  password: string().required(),
});

export const loginSchema: ObjectSchema = object({
  email: string().required(),
  password: string().required(),
});
