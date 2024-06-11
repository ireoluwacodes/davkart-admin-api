import { comparePassword, hashPassword, signToken } from "../utils";
import { ForbiddenRequestError } from "../errors";
import { IUser, User } from "../users";

export class AuthService {
  private userModel = User;

  public async register(
    fullName: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const users = await this.userModel.find({ email, role: "admin" }).lean();
    if (users.length >= 1) {
      throw new ForbiddenRequestError("admin user already exists");
    }
    const hash = await hashPassword(password) as string;
    const user = await this.userModel.create({
      fullName,
      email,
      role: "admin",
      hash,
    });
    return user;
  }

  public async login(email: string, password: string): Promise<IUser | {}> {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) {
      throw new ForbiddenRequestError("invalid email or password");
    }
    const isMatch = await comparePassword(user.hash, password) as boolean;
    if (!isMatch) {
      throw new ForbiddenRequestError("invalid email or password");
    }
    const token = await signToken(user._id, user.email);

    await this.userModel.findByIdAndUpdate(user._id, {
      accessToken: token,
      refreshValidTill: Date.now() + 168 * 60 * 60 * 1000,
    });

    return {
      ...user,
      accessToken: undefined,
      hash: undefined,
      refreshValidTill: undefined,
      token,
    };
  }

  public async refresh(token: string) {}

  public async logout(id: string) {}
}
