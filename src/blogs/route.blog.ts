import { Router } from 'express';
import { createBlogSchema, editBlogSchema } from './validator.blog';
import { BlogController } from './controller.blog';
import { authMiddleware } from '../auth';
import { isAdmin, successHandler, validator } from '../middlewares';

const blogController = new BlogController();

export const BlogRouter = Router();

BlogRouter.route('/create').post(
  validator(createBlogSchema),
  authMiddleware,
  blogController.createBlog,
  successHandler,
);

BlogRouter.route('/edit/:id').patch(
  validator(editBlogSchema),
  authMiddleware,
  blogController.editBlog,
  successHandler,
);

BlogRouter.route('/delete/:id').delete(
  authMiddleware,
  blogController.deleteBlog,
  successHandler,
);

BlogRouter.route('/admin-delete/:id').delete(
  authMiddleware,
  isAdmin,
  blogController.deleteBlogPermanently,
  successHandler,
);

BlogRouter.route('/').get(
  authMiddleware,
  isAdmin,
  blogController.getAllBlogs,
  successHandler,
);

BlogRouter.route('/active').get(
  authMiddleware,
  blogController.getActiveBlogs,
  successHandler,
);

BlogRouter.route('/author/:id').get(
  authMiddleware,
  blogController.getAllBlogsByAuthor,
  successHandler,
);
