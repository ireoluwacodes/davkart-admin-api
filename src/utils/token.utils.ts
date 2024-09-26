import { JsonWebTokenError, sign, verify } from 'jsonwebtoken';
import { secret } from '../config';

export const signToken = async (id: string, email: string) => {
  try {
    const payload = {
      sub: id,
      email,
    };
    const token = sign(payload, secret, {
      expiresIn: '1h',
    }) as string;
    return token;
  } catch (error: any) {
    throw new JsonWebTokenError(error);
  }
};

export const verifyToken = async (token: string) => {
  try {
    type payload = {
      sub: string;
      email: string;
    };
    const payload = verify(token, secret) as payload;
    return payload;
  } catch (error: any) {
    throw new JsonWebTokenError(error);
  }
};

export const signRefreshToken = async (id: string, email: string) => {
  try {
    const payload = {
      sub: id,
      email,
    };
    const token = sign(payload, secret, {
      expiresIn: '7d',
    }) as string;
    return token;
  } catch (error: any) {
    throw new JsonWebTokenError(error);
  }
};
