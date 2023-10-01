import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";

export function issueJWT(user: { id: string }) {
  const expiresIn = "30s";

  const payload = {
    sub: user,
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
