import { JsonWebTokenError, sign, verify } from "jsonwebtoken";
import { secret } from "../config";

export const signToken = async (id: string, email: string) => {
  try {
    let payload = {
      sub: id,
      email,
    };
    let token: string = sign(payload, secret, {
      expiresIn: "1h",
    });
    return token;
  } catch (error: any) {
    throw new JsonWebTokenError(error);
  }
};

export const verifyToken = async (token: string) => {
  try {
    let payload = verify(token, secret);
    return payload;
  } catch (error: any) {
    throw new JsonWebTokenError(error);
  }
};

export const signRefreshToken = async (id: string, email: string) => {
  try {
    let payload = {
      sub: id,
      email,
    };
    let token = sign(payload, secret, {
      expiresIn: "7d",
    });
    return token;
  } catch (error: any) {
    throw new JsonWebTokenError(error);
  }
};
