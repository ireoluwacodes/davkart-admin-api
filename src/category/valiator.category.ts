import Joi, { ObjectSchema } from "joi";

export const createCategorySchema: ObjectSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
