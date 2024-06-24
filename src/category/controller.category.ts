import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./service.category";
import { ProtectedRequest } from "../auth";
import { CREATED, OK } from "http-status";
import { validateDbId } from "../utils";

const categoryService = new CategoryService()
export class CategoryController {
  public async createNewCategory(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, description } = req.body;

      const category = await categoryService.create(name, description);

      const data = {
        statusCode: CREATED,
        data: category,
        message: "Category created successfully",
      };

      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async readAllCategories(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categories = await categoryService.findAll();

      const data = {
        statusCode: OK,
        data: categories,
        message: "success",
      };

      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }
  public async deleteExistingCategory(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      await validateDbId(id)

      await categoryService.delete(id);

      const data = {
        statusCode: OK,
        message: "successfully deleted",
      };

      req.data = data;
      next();
    } catch (error) {
      next(error);
    }
  }
}
