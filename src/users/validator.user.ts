import Joi, { ObjectSchema } from "joi";

export const createUserSchema: ObjectSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string(),
  role: Joi.string()
    .valid(...["admin", "author"])
    .required(),
  gender: Joi.string().required(),
});

export const updateUserSchema: ObjectSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  role: Joi.string().valid(...["admin", "author"]),
  avatar: Joi.string(),
  gender: Joi.string(),
});
