import { BadRequestError, ForbiddenRequestError } from '../errors';
import { Category } from '../category';
import { Blog } from './model.blog';
import { IBlog } from './interface.blog';
import { User } from '../users';

export class BlogService {
  private blogModel = Blog;
  private categoryModel = Category;
  private userModel = User;

  public async create(
    title: string,
    body: string,
    category: string,
    cover: string,
    authorId: string,
  ): Promise<IBlog> {
    const findCategory = await this.categoryModel.findById(category);
    if (!findCategory) throw new BadRequestError('invalid category');
    const blog = await this.blogModel.create({
      title,
      body,
      category: findCategory._id,
      releaseDate: Date.now(),
      coverPhoto: cover,
      author: authorId,
    });
    return blog;
  }

  public async update(
    blogId: string,
    title: string,
    body: string,
    cover: string,
  ): Promise<IBlog> {
    const blog = await this.blogModel
      .findByIdAndUpdate(
        blogId,
        {
          title,
          body,
          coverPhoto: cover,
        },
        { new: true },
      )
      .lean();
    return blog;
  }

  public async delete(blogId: string) {
    await this.blogModel.findByIdAndUpdate(blogId, {
      status: 'deleted',
    });
  }

  public async deletePermanently(blogId: string) {
    await this.blogModel.findByIdAndDelete(blogId);
  }

  public async getAll(): Promise<IBlog[]> {
    const blogs = await this.blogModel.find().lean();
    return blogs;
  }

  public async getActive(): Promise<IBlog[]> {
    const blogs = await this.blogModel.find({ status: 'active' }).lean();
    return blogs;
  }

  public async getByAuthor(userId: string, authorId: string) {
    const user = await this.userModel.findById(userId);
    if (user.role !== 'admin' && userId !== authorId)
      throw new ForbiddenRequestError(
        'Only admin user can request other blogs apart from self',
      );
    const blogs = await this.blogModel
      .find({ author: authorId, status: 'active' })
      .lean();
    return blogs;
  }

  // public async comment(blogId: string) {}
}
