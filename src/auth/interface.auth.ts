import { Request } from "express";

export interface ProtectedRequest extends Request {
  data?: any;
  user?: {
    sub: string;
    email: string;
  };
}
