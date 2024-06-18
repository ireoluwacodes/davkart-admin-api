import { NextFunction, Response } from "express";
import { ProtectedRequest } from "../auth";

export const successHandler = (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.data;
    return res.status(data.statusCode).json({
      message: data.message,
      data: data.data,
      statusCode: data.statusCode,
    });
  } catch (error) {
    next(error);
  }
};
