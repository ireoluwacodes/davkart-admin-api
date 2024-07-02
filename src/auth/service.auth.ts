import {
  comparePassword,
  hashPassword,
  signToken,
  verifyToken,
} from "../utils";
import { ForbiddenRequestError } from "../errors";
import { IUser, User } from "../users";
import { generateOtp } from "./../utils/otp.utils";
import axios from "axios";
import { mailService } from "../config";

export class AuthService {
  private userModel = User;

  public async register(
    fullName: string,
    email: string,
    password: string,
    gender: string
  ): Promise<IUser> {
    const users = await this.userModel.find({ role: "admin" }).lean();
    if (users.length >= 1) {
      throw new ForbiddenRequestError("admin user already exists");
    }
    const hash = (await hashPassword(password)) as string;
    const user = await this.userModel.create({
      fullName,
      email,
      gender,
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
    const isMatch = (await comparePassword(user.hash, password)) as boolean;
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

  public async refresh(token: string) {
    const user = await this.userModel.findOne({ accessToken: token }).lean();
    if (!user) {
      throw new ForbiddenRequestError("invalid token");
    }
    if (new Date(user.refreshValidTill).getTime() < Date.now()) {
      throw new ForbiddenRequestError("refresh token is EXPIRED");
    }
    try {
      const payload = await verifyToken(token);

      return {
        ...user,
        accessToken: undefined,
        hash: undefined,
        refreshValidTill: undefined,
        token,
      };
    } catch (error) {
      const token = (await signToken(user._id, user.email)) as string;

      await this.userModel.findByIdAndUpdate(user._id, {
        accessToken: token,
      });
      return {
        ...user,
        accessToken: undefined,
        hash: undefined,
        refreshValidTill: undefined,
        token,
      };
    }
  }

  public async logout(id: string) {
    await this.userModel.findByIdAndUpdate(id, {
      accessToken: " ",
      refreshValidTill: 0,
    });
  }

  public async forgotAuth(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new ForbiddenRequestError("User not found");
    }
    const otp = generateOtp() as number;

    const otpExpiresIn = Date.now() + 10 * 60 * 1000;

    const requestData = JSON.stringify({
      email,
      otp,
    });

    await axios.post(`${mailService}/send-otp`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    await this.userModel.findByIdAndUpdate(user._id, {
      otp,
      otpExpiresIn,
    });
  }

  public async confirmOtp(
    otp: string,
    email: string
  ): Promise<{ token: string }> {
    const user = await this.userModel.findOne({
      email,
      otp,
    });

    if (!user || new Date(user.otpExpiresIn).getTime() < Date.now()) {
      throw new ForbiddenRequestError("Invalid OTP or Email");
    }

    const token = (await signToken(user._id, user.email)) as string;

    return {
      token,
    };
  }

  public async resetPass(id: string, password: string) {
    const user = await this.userModel.findByIdAndUpdate(id, {
      hash: (await hashPassword(password)) as string,
    });
  }

  public async changePass(email: string) {}
}
