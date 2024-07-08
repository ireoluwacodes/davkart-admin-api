import { JsonWebTokenError } from "jsonwebtoken";
import { ForbiddenRequestError, UnauthorizedRequestError } from "../errors";
import { verifyToken } from "../utils";
import { NextFunction, Response } from "express";
import { ProtectedRequest } from "./interface.auth";

export const authMiddleware = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization)
      throw new ForbiddenRequestError(
        "Invalid token, pass token as a Bearer in authorization headers"
      );
    const [scheme, token] = req.headers.authorization.split(" ");
    if (scheme == "Bearer") {
      if (!token || token == "") {
        throw new UnauthorizedRequestError(
          "Invalid token, pass token as a Bearer in authorization headers"
        );
      } else {
        try {
          let payload: any = await verifyToken(token);
          req.user = payload;
          next();
        } catch (error: any) {
          throw new JsonWebTokenError("Could not verify token", error);
        }
      }
    } else {
      throw new ForbiddenRequestError(
        "Invalid token, pass token as a Bearer in authorization headers"
      );
    }
  } catch (error) {
    next(error);
  }
};
