import { ICategory } from './interface.category';
import { Category } from './model.category';

export class CategoryService {
  private categoryModel = Category;

  public async create(name: string, description: string): Promise<ICategory> {
    const category = await this.categoryModel.create({ name, description });

    return category;
  }

  public async findAll(): Promise<ICategory[]> {
    const categories = await this.categoryModel.find({}).lean();

    return categories;
  }

  public async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id);
  }
}
