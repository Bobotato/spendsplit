import { UnauthorisedError } from "@/services/errors";

async function verifyJWT() {
  try {
    const response = await fetch("http://localhost:3000/api/auth/verifyJWT", {
      method: "POST",
    });
    if (response.status) {
      if (response.status === 401) {
        throw new UnauthorisedError("JWT not found or expired.");
      } else {
        throw new UnauthorisedError("Something went wrong with verification.");
      }
    }
  } catch (e) {
    throw e;
  }
}

export { verifyJWT };
