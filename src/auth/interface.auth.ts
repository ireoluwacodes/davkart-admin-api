import { Request } from "express";

export interface ProtectedRequest extends Request {
  data?: {
    statusCode: number;
    message: string;
    data?: object;
  };
  user?: {
    sub: string;
    email: string;
  };
}
