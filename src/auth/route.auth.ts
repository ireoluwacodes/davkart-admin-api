import { Router } from "express";
import { AuthController } from "./controller.auth";
import { successHandler, validator } from "../middlewares";

const authController = new AuthController()

export const AuthRouter = Router()