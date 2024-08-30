import { Secret, sign, verify } from "jsonwebtoken";
import { MissingEnvError } from "./errors";
import type { Algorithm } from "jsonwebtoken";

interface accessTokenData {
  username: string;
  userId: number;
}

function decryptAccessToken(accessToken: string) {
  if (process.env.JWT_SECRET && process.env.JWT_ALGO) {
    const payload = verify(accessToken, process.env.JWT_SECRET as Secret, {
      algorithms: [process.env.JWT_ALGO as Algorithm],
    });
    return payload;
  } else {
    throw new MissingEnvError("Env missing");
  }
}

function generateAccessToken(data: accessTokenData) {
  console.log(data)
  if (
    !process.env.JWT_SECRET ||
    !process.env.JWT_EXPIRY ||
    !process.env.JWT_ALGO
  ) {
    throw new MissingEnvError("Env missing");
  } else {
    const token = sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY as string,
      algorithm: process.env.JWT_ALGO as Algorithm,
    });
    return token;
  }
}

export { decryptAccessToken, generateAccessToken };
