import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../types/models";
import { Document } from "mongoose";

export function issueJWT(
  user: Document<unknown, NonNullable<unknown>, IUser> &
    IUser &
    Required<{
      _id: string;
    }>
) {
  const expiresIn = "30s";

  const payload = {
    sub: user._id,
    username: user.username,
    // iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
    // algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
