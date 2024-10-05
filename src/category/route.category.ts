import { Router } from 'express';
import { CategoryController } from './controller.category';
import { successHandler, validator } from '../middlewares';
import { createCategorySchema } from './valiator.category';
import { authMiddleware } from '../auth';

const categoryController = new CategoryController();

export const CategoryRouter = Router();

CategoryRouter.route('/create').post(
  validator(createCategorySchema),
  authMiddleware,
  categoryController.createNewCategory,
  successHandler,
);

CategoryRouter.route('/').get(
  categoryController.readAllCategories,
  successHandler,
);

CategoryRouter.route('/delete/:id').delete(
  authMiddleware,
  categoryController.deleteExistingCategory,
  successHandler,
);
