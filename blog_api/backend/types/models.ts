import { Model, Types } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  apiKey: string;
}

export type Post = {
  title: string;
  content: string;
  date: Date;
  categoryId: Types.ObjectId;
  authorId: Types.ObjectId;
  viewCount: number;
  isPublished: boolean;
};

export type Category = {
  title: string;
};

// Put all user instance methods in this interface:
export interface IUserMethods {
  comparePasswords(): boolean;
}

export type UserModel = Model<IUser, IUserMethods>;
