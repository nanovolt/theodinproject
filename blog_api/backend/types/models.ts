import { Model } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  apiKey: string;
}

// Put all user instance methods in this interface:
export interface IUserMethods {
  comparePasswords(): boolean;
}

export type UserModel = Model<IUser, IUserMethods>;

// export interface UserModel extends Model<IUser> {
//   comparePasswords(): boolean;
// }
