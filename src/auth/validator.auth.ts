import Joi, { ObjectSchema } from "joi";

export const createUserSchema: ObjectSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  gender: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginSchema: ObjectSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
