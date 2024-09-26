import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt();
    const myHash = await hash(password, salt);
    return myHash;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const comparePassword = async (
  hash: string,
  password: string,
): Promise<boolean> => {
  try {
    return await compare(password, hash);
  } catch (error: any) {
    throw new Error(error);
  }
};
