import { UNAUTHORIZED } from 'http-status';
import { JsonWebTokenError } from 'jsonwebtoken';
import { MongooseError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import {
  BadRequestError,
  ForbiddenRequestError,
  ResourceNotFoundError,
  UnauthorizedRequestError,
} from './exceptions';

export const errHandler = (
  error: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction, // Make sure you include next, even if unused, for proper error propagation
): Response<unknown> => {
  let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
  const message: { [key: number]: string } = { 1: 'A server error occurred' };
  let type: string = 'Admin Server Error';

  if (error instanceof Error) {
    message[1] = error.message;
  }

  if (error instanceof JsonWebTokenError) {
    statusCode = UNAUTHORIZED;
    message[1] = error.message;
    type = 'JWT Error or JWT Expired Error';
  }

  if (error instanceof AxiosError) {
    statusCode = error.response?.status || 500;
    message[1] = error.message;
    message[2] = JSON.stringify(error.response?.data) || 'No additional data';
    type = 'Axios Error';
  }

  if (error instanceof MongooseError) {
    message[1] = error.message;
    type = 'Mongoose or MongoDB Error';
  }

  if (
    error instanceof UnauthorizedRequestError ||
    error instanceof BadRequestError ||
    error instanceof ResourceNotFoundError ||
    error instanceof ForbiddenRequestError
  ) {
    statusCode = error.statusCode;
    message[1] = error.message;
    type = error.name;
  }

  return res.status(statusCode).json({
    status: 'fail',
    type,
    message,
    // Uncomment this for debugging in development, but hide in production
    // stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};
