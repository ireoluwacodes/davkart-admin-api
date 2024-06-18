import { Router } from "express";
import { CategoryController } from "./controller.category";
import { validator } from "../middlewares";
import { createCategorySchema, updateCategorySchema } from "./valiator.category";
import { authMiddleware } from "../auth";

const categoryController = new CategoryController()

export const CategoryRouter = Router()

CategoryRouter.route("/category").post(validator(createCategorySchema), authMiddleware, categoryController.createNewCategory)

CategoryRouter.route("/category").get(validator(updateCategorySchema), authMiddleware, categoryController.readAllCategories)

CategoryRouter.route("/category/:id").delete(authMiddleware, categoryController.deleteExistingCategory)