import { decryptAccessToken } from "@/app/api/lib/jwt/jwt";

import { UnauthorisedError } from "@/services/errors";

async function verifyJWT(token: string) {
  try {
    if (token) {
      decryptAccessToken(token);
    } else {
      throw new UnauthorisedError("Token was not supplied.");
    }
  } catch (e) {
    throw e;
  }
}

export { verifyJWT };
