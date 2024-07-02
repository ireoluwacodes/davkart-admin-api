import { Router } from "express";
import { AuthController } from "./controller.auth";
import { successHandler, validator } from "../middlewares";
import { createUserSchema, loginSchema } from "./validator.auth";
import { authMiddleware } from "./middleware.auth";

const authController = new AuthController();

export const AuthRouter = Router();

AuthRouter.route("/register").post(
  validator(createUserSchema),
  authController.register,
  successHandler
);

AuthRouter.route("/login").post(
  validator(loginSchema),
  authController.login,
  successHandler
);

AuthRouter.route("/refresh/:token").get(authController.refresh, successHandler);

AuthRouter.route("/forgot-pass").post(authController.forgotPassword, successHandler);

AuthRouter.route("/confirm-otp").post(
  authMiddleware,
  authController.confirmOtp,
  successHandler
);

AuthRouter.route("/reset-pass").post(
  authMiddleware,
  authController.resetPassword,
  successHandler
);

AuthRouter.route("/logout").get(
  authMiddleware,
  authController.logout,
  successHandler
);
