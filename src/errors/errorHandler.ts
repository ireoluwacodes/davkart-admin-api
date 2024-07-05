import { UNAUTHORIZED } from "http-status";
import { JsonWebTokenError } from "jsonwebtoken";
import { MongooseError } from "mongoose";
import {
  BadRequestError,
  ForbiddenRequestError,
  ResourceNotFoundError,
  UnauthorizedRequestError,
} from "./exceptions";
import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";

export const errHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> => {
  let statuscode: number = res.statusCode == 200 ? 500 : res.statusCode;
  let message: any = "A server error occurred";
  let type: string = "Admin Server Error";
  if (error instanceof Error) {
    message = error.message;
  }
  if (error instanceof JsonWebTokenError) {
    statuscode = UNAUTHORIZED;
    message = error.message;
    type = "JWT Error or JWT Expired error";
  }
  if (error instanceof AxiosError) {
    statuscode = error.response?.status || 500;
    message = {
      1 : error.message,
      2 : error.response?.data
    } || "A network error occurred";
    type = "Axios Error";
  }
  if (error instanceof MongooseError) {
    message = error.message;
    type = "Mongoose or MongoDB Error";
  }
  if (
    error instanceof UnauthorizedRequestError ||
    error instanceof BadRequestError ||
    error instanceof ResourceNotFoundError ||
    error instanceof ForbiddenRequestError
  ) {
    statuscode = error.statusCode;
    message = error.message;
    type = error.name;
  }
  return res.status(statuscode).json({
    status: "fail",
    type,
    message,
    // stack: error?.stack,
  });
};
