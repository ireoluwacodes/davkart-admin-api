import { Router } from "express";
import { createBlogSchema, editBlogSchema } from "./validator.blog";
import { BlogController } from "./controller.blog";
import { authMiddleware } from "../auth";
import { isAdmin, validator } from "../middlewares";

const blogController = new BlogController();

export const BlogRouter = Router();

BlogRouter.route("/create").post(
  validator(createBlogSchema),
  authMiddleware,
  blogController.createBlog
);

BlogRouter.route("/edit-blog/:id").patch(
  validator(editBlogSchema),
  authMiddleware,
  blogController.editBlog
);

BlogRouter.route("/delete/:id").delete(
  authMiddleware,
  blogController.deleteBlog
);

BlogRouter.route("/admin-delete/:id").delete(
  authMiddleware,
  blogController.deleteBlogPermanently
);

BlogRouter.route("/").get(authMiddleware, isAdmin, blogController.getAllBlogs);

BlogRouter.route("/active").get(authMiddleware, blogController.getActiveBlogs);

BlogRouter.route("/author/:id").get(
  authMiddleware,
  blogController.getAllBlogsByAuthor
);
