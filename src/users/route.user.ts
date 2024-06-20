import { Router } from "express";
import { UserController } from "./controller.user";
import { authMiddleware } from "../auth";
import { uploadPhoto, validator } from "../middlewares";
import { createUserSchema, updateUserSchema } from "./validator.user";

export const UserRouter = Router();

const userController = new UserController();

UserRouter.route("/create").post(
  validator(createUserSchema),
  authMiddleware,
  userController.createUser
);

UserRouter.route("/update").post(
  validator(updateUserSchema),
  authMiddleware,
  userController.updateUser
);

UserRouter.route("/upload").post(authMiddleware, uploadPhoto.array("images", 1), userController.uploadImage);

UserRouter.route("/delete/:id").delete(
  authMiddleware,
  userController.deleteUser
);

UserRouter.route("/").get(authMiddleware, userController.getAllUsers);

UserRouter.route("/contact").post(userController.sendContactUsMail);
