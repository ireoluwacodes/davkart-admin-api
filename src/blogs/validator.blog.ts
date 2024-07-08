import Joi, { ObjectSchema } from "joi";

export const createBlogSchema: ObjectSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string().required(),
  cover: Joi.string().required(),
});

export const editBlogSchema: ObjectSchema = Joi.object({
  title: Joi.string(),
  body: Joi.string(),
  cover: Joi.string(),
});
