import { NextFunction, Request, Response } from 'express';
import { ResourceNotFoundError } from './exceptions';

export const notFound = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    throw new ResourceNotFoundError(
      `Route not found : ${req.method} : ${req.originalUrl}`,
    );
  } catch (error) {
    next(error);
  }
};
