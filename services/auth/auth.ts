import { InvalidJWTError } from "@/app/api/lib/jwt/errors";
import { decryptAccessToken } from "@/app/api/lib/jwt/jwt";

import { UnauthorisedError } from "@/services/errors";

async function verifyJWT(token: string) {
  try {
    const data = await decryptAccessToken(token);
    return data;
  } catch (e) {
    if (e instanceof InvalidJWTError) {
      throw new UnauthorisedError("Token was invalid.");
    }
  }
}

export { verifyJWT };
