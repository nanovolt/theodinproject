import { Schema } from "mongoose";
import { mongoConn } from "../config/mongodb";
import { IUser } from "../types/models";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, maxlength: 16 },
    password: { type: String, required: true },
    apiKey: String,
  },
  { versionKey: false }
);

// userSchema.static("comparePasswords", function (compare: string) {
//   return this.find({ compare });
// });

// userSchema.method("comparePasswords", function (compare: string) {
//   return this.username === compare;
// });

export const UserModel = mongoConn.model<IUser>("User", userSchema);
