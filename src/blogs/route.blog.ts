import { Router } from "express";
import { createBlogSchema, editBlogSchema } from "./validator.blog";
import { BlogController } from "./controller.blog";
import { authMiddleware } from "../auth";

const blogController = new BlogController()

export const BlogRouter = Router()

