import { isValidObjectId } from 'mongoose';
import { ForbiddenRequestError } from '../errors/exceptions';

export const validateDbId = async (...idArr: string[]): Promise<void> => {
  idArr.forEach((id) => {
    if (!isValidObjectId(id)) {
      throw new ForbiddenRequestError('Invalid MongoDb Id');
    }
  });
};
