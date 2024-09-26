import { NextFunction, Response } from 'express';
import { ProtectedRequest } from '../auth';
import { UserService } from './service.user';
import { CREATED, OK } from 'http-status';
import { BadRequestError } from '../errors';
import { validateDbId } from '../utils';

const userService = new UserService();
export class UserController {
  /**
   * Creates a new user in the system.
   *
   * @param {ProtectedRequest} req - The request object containing the user's data.
   * @param {Response} res - The response object to send back to the client.
   * @param {NextFunction} next - The next middleware function in the chain.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   * @throws Will throw an error if the user data is invalid or if there is a database error.
   */
  public async createUser(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { fullName, email, gender, password, role, avatar } = req.body;
      const user = await userService.create(
        fullName,
        email,
        gender,
        password,
        role,
        avatar,
      );
      req.data = {
        statusCode: CREATED,
        message: 'User Created Successfully',
        data: user,
      };
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates a user in the system.
   */
  public async updateUser(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.user?.sub;
      const { fullName, email, gender, role, avatar } = req.body;
      const user = await userService.update(
        id,
        fullName,
        email,
        gender,
        role,
        avatar,
      );
      req.data = {
        statusCode: OK,
        message: 'User updated Successfully',
        data: user,
      };
      next();
    } catch (error) {
      next(error);
    }
  }

  public async uploadImage(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      if (files.length < 1) {
        throw new BadRequestError('File not found : Error uploading');
      }
      const urls = await userService.upload(files);
      req.data = {
        statusCode: OK,
        message: 'Image uploaded Successfully',
        data: urls,
      };
      next();
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      await validateDbId(id);
      await userService.delete(id);
      req.data = {
        statusCode: OK,
        message: 'User Deleted Successfully',
      };
      next();
    } catch (error) {
      next(error);
    }
  }
  public async getAllUsers(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await userService.getAll();
      req.data = {
        statusCode: OK,
        message: 'All Users',
        data: users,
      };
      next();
    } catch (error) {
      next(error);
    }
  }
}
