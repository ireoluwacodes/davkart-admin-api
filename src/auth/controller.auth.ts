import { NextFunction, Request, Response } from "express";
import { AuthService } from "./service.auth";
import { ProtectedRequest } from "./interface.auth";
import { CREATED } from "http-status";

export class AuthController {
  private authService: AuthService;

  public async register(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, password, fullName } = req.body;

      const user = await this.authService.register(email, password, fullName);
      const data = {
        statusCode: CREATED,
        user,
        message: "User Created Successfully",
      };
      req.data = data;
      next();
    } catch (error: any) {
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
    } catch (error: any) {
      next(error);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
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
    } catch (error: any) {
      next(error);
    }
  }
}
