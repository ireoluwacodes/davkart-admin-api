import Joi, { ObjectSchema } from "joi";

export const createCategorySchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateCategorySchema: ObjectSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
});
