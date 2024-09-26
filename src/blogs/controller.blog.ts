import { NextFunction, Response } from 'express';
import { ProtectedRequest } from '../auth';
import { CREATED, OK } from 'http-status';
import { BlogService } from './service.blog';
import { validateDbId } from '../utils';

const blogService = new BlogService();
export class BlogController {
  public async createBlog(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authorId = req.user.sub;
      const { title, body, category, cover } = req.body;

      const blog = await blogService.create(
        title,
        body,
        category,
        cover,
        authorId,
      );

      const data = {
        statusCode: CREATED,
        data: blog,
        message: 'Blog Created Successfully',
      };
      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }
  public async editBlog(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const blogId = req.params.id;
      const { title, body, cover } = req.body;

      const blog = await blogService.update(blogId, title, body, cover);

      const data = {
        statusCode: OK,
        data: blog,
        message: 'Blog updated Successfully',
      };
      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }
  public async deleteBlog(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const blogId = req.params.id;

      await blogService.delete(blogId);

      const data = {
        statusCode: OK,
        message: 'Blog deleted',
      };
      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async deleteBlogPermanently(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const blogId = req.params.id;

      await blogService.deletePermanently(blogId);

      const data = {
        statusCode: OK,
        message: 'Blog deleted permanently',
      };
      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }
  public async getAllBlogs(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const blogs = await blogService.getAll();

      const data = {
        statusCode: OK,
        data: blogs,
        message: 'All Blogs',
      };
      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async getActiveBlogs(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const blogs = await blogService.getActive();

      const data = {
        statusCode: OK,
        data: blogs,
        message: 'Active Blogs',
      };
      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async getAllBlogsByAuthor(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user.sub;
      const authorId = req.params.id;
      await validateDbId(userId, authorId);
      const blogs = await blogService.getByAuthor(userId, authorId);

      const data = {
        statusCode: OK,
        data: blogs,
        message: 'My Blogs',
      };
      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }
  // public async createComment(
  //   req: ProtectedRequest,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<void> {
  //   try {
  //     const blogId = req.params.id;
  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
