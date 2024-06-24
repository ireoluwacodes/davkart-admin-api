import { NextFunction, Request, Response } from "express";
import { AuthService } from "./service.auth";
import { ProtectedRequest } from "./interface.auth";
import { CREATED, OK } from "http-status";
import { validateDbId } from "../utils";

const authService = new AuthService();

export class AuthController {
  public async register(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, password, fullName, gender } = req.body;

      const user = await authService.register(
        email,
        password,
        fullName,
        gender
      );
      const data = {
        statusCode: CREATED,
        data: user,
        message: "User Created Successfully",
      };
      req.data = data;
      next();
    } catch (error: any) {
      next(error);
    }
  }

  public async login(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, password } = req.body;

      const user = await authService.login(email, password);

      const data = {
        statusCode: OK,
        data: user,
        message: "Login Successfully",
      };
      req.data = data;
      next();
    } catch (error: any) {
      next(error);
    }
  }

  public async refresh(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { token } = req.params;

      const user = await authService.refresh(token);

      const data = {
        statusCode: OK,
        data: user,
        message: "success",
      };
      req.data = data;
      next();
    } catch (error: any) {
      next(error);
    }
  }

  public async logout(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.user.sub;
      await validateDbId(id);
      await authService.logout(id);
      const data = {
        statusCode: OK,
        message: "success",
      };
      req.data = data;
      next();
    } catch (error: any) {
      next(error);
    }
  }
}
