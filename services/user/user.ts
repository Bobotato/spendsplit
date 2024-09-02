import { UnauthorisedError } from "@/services/errors";

async function getUserDetailsFromJWT() {
  try {
    const response = await fetch("../api/auth/verifyJWT", {
      method: "POST",
    });
    if (!response.ok) {
      throw new UnauthorisedError("JWT was expired or unauthorised, please log in again.");
    }
    return response;
  } catch (e) {
    throw e;
  }
}

export { getUserDetailsFromJWT };
