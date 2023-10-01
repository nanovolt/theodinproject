import { Schema } from "mongoose";
import { mongoConn } from "../config/mongodb";
import { IUser } from "../types/models";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// userSchema.static("comparePasswords", function (compare: string) {
//   return this.find({ compare });
// });

// userSchema.method("comparePasswords", function (compare: string) {
//   return this.username === compare;
// });

export const User = mongoConn.model<IUser>("User", userSchema);
