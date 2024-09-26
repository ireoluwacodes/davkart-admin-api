import { NextFunction, Response } from 'express';
import { ProtectedRequest } from '../auth';
import { User } from '../users';
import { UnauthorizedRequestError } from '../errors';

export const isAdmin = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user.sub;
    const user = await User.findOne({ _id: id, role: 'admin' });
    if (!user)
      throw new UnauthorizedRequestError('not authorized to access this route');
    next();
  } catch (error) {
    next(error);
  }
};
