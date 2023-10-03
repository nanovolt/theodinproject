import "dotenv/config";
import debug from "debug";

import jsonwebtoken from "jsonwebtoken";

const log = debug("config:jwt");

export function issueJWT(user: { id: string }, options: { secret: string; expiresIn: string }) {
  const payload = {
    sub: user.id,
  };

  const signedToken = jsonwebtoken.sign(payload, options.secret, {
    expiresIn: options.expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: options.expiresIn,
  };
}

export function extractTokenFromCookie(cookies) {
  if (!cookies.refreshToken) {
    return null;
  }

  const token = cookies.refreshToken.token;
  log("extracted token:", token);
  return token;
}

export function extractToken(str: string) {
  return str.split(" ")[1];
}

export function extractPayload(req) {
  if (req && req.cookies.refreshToken) {
    const token = req.cookies.refreshToken.token.split(" ")[1];
    const verifiedToken = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return verifiedToken;
  }
  return null;
}
