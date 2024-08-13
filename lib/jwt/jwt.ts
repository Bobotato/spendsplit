import { sign, verify } from "jsonwebtoken";

interface accessTokenData {
  email: string;
}

const jwtSecretKey = process.env.JWT_SECRET;
const jwtAlgo = process.env.JWT_ALGO;
const exp = process.env.JWT_EXPIRY;

function decryptAccessToken(accessToken: string) {
  const payload = verify(accessToken, jwtSecretKey);
  return payload;
}

function generateAccessToken(data: accessTokenData) {
  try {
    const token = sign(data, jwtSecretKey, {
      algorithm: jwtAlgo,
      expiresIn: exp,
    });
    return token;
  } catch (e) {
    console.error(e);
  }
}

export { decryptAccessToken, generateAccessToken };
