import { MissingEnvError } from "@/app/api/lib/jwt/errors";
import { jwtVerify, base64url, SignJWT } from "jose";

interface accessTokenData {
  username: string;
  userId: number;
}

async function decryptAccessToken(accessToken: string) {
  try {
    if (process.env.JWT_SECRET && process.env.JWT_ALGO) {
      const secret = base64url.decode(process.env.JWT_SECRET);
      const payload = await jwtVerify(accessToken, secret);
      return payload;
    } else {
      throw new MissingEnvError("Env missing");
    }
  } catch (e) {
    console.log(e)
  }
}

async function generateAccessToken(payload: accessTokenData) {
  if (
    !process.env.JWT_SECRET ||
    !process.env.JWT_EXPIRY ||
    !process.env.JWT_ALGO
  ) {
    throw new MissingEnvError("Env missing");
  } else {
    const secret = base64url.decode(process.env.JWT_SECRET);
    const jwt = await new SignJWT({
      username: payload.username,
      userId: payload.userId,
    })
      .setProtectedHeader({ alg: process.env.JWT_ALGO })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);
    return jwt;
  }
}

export { decryptAccessToken, generateAccessToken };
