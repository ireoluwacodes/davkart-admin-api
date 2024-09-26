import { Router } from 'express';
import { UserController } from './controller.user';
import { successHandler, uploadPhoto, validator } from '../middlewares';
import { createUserSchema, updateUserSchema } from './validator.user';
import { authMiddleware } from '../auth/middleware.auth';

const userController = new UserController();

export const UserRouter = Router();

UserRouter.route('/create').post(
  validator(createUserSchema),
  authMiddleware,
  userController.createUser,
  successHandler,
);

UserRouter.route('/update').patch(
  validator(updateUserSchema),
  authMiddleware,
  userController.updateUser,
  successHandler,
);

UserRouter.route('/upload').post(
  authMiddleware,
  uploadPhoto.array('images', 1),
  userController.uploadImage,
  successHandler,
);

UserRouter.route('/delete/:id').delete(
  authMiddleware,
  userController.deleteUser,
  successHandler,
);

UserRouter.route('/').get(
  authMiddleware,
  userController.getAllUsers,
  successHandler,
);
