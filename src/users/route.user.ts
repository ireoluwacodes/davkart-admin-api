import { Router } from "express";
import { UserController } from "./controller.user";
import { uploadPhoto, validator } from "../middlewares";
import { createUserSchema, updateUserSchema } from "./validator.user";
import { authMiddleware } from "../auth/middleware.auth";

const userController = new UserController();

export const UserRouter = Router();

UserRouter.route("/create").post(
  validator(createUserSchema),
  authMiddleware,
  userController.createUser
);

UserRouter.route("/update").patch(
  validator(updateUserSchema),
  authMiddleware,
  userController.updateUser
);

UserRouter.route("/upload").post(
  authMiddleware,
  uploadPhoto.array("images", 1),
  userController.uploadImage
);

UserRouter.route("/delete/:id").delete(
  authMiddleware,
  userController.deleteUser
);

UserRouter.route("/").get(authMiddleware, userController.getAllUsers);

UserRouter.route("/contact").post(userController.sendContactUsMail);
