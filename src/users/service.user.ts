import { unlinkSync } from "fs";
import { cloudinaryUpload } from "../config";
import { ForbiddenRequestError } from "../errors";
import { hashPassword } from "../utils";
import { IUser } from "./interface.user";
import { User } from "./model.user";

export class UserService {
  private userModel = User;

  public async create(
    fullName: string,
    email: string,
    gender: string,
    password: string,
    role: string,
    avatar: string
  ): Promise<IUser> {
    const findUser = await this.userModel.findOne({ email }).lean();
    if (findUser) throw new ForbiddenRequestError("This user already exists");
    const hash = (await hashPassword(password)) as string;
    const user = await this.userModel.create({
      fullName,
      email,
      gender,
      hash,
      role,
      avatar,
    });
    return user;
  }
  public async update(
    fullName: string,
    email: string,
    gender: string,
    role: string,
    avatar: string
  ): Promise<IUser> {
    const findUser = await this.userModel.findOne({ email }).lean();
    if (!findUser) throw new ForbiddenRequestError("This user does not exist");
    const user = await this.userModel.findByIdAndUpdate(
      findUser._id,
      {
        fullName,
        email,
        gender,
        role,
        avatar,
      },
      { new: true }
    );
    return user;
  }

  public async sendMail() {}

  public async upload(files: Express.Multer.File[]): Promise<string[]> {
    const uploader = (path: string) => cloudinaryUpload(path);
    let urls: string[];
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      unlinkSync(path);
    }
    return urls;
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.userModel.find({}).lean();
    return users;
  }

  public async delete(id: string) {
    await this.userModel.findByIdAndDelete(id);
  }
}
