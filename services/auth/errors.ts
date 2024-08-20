import {
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  APIServerDownError,
} from "@/services/errors";

const authErrorCodes: { [key: number]: Error } = {
  401: new InvalidCredentialsError("Credentials are invalid"),
  409: new UsernameAlreadyExistsError("User already exists"),
  500: new APIServerDownError("API Server down"),
};

export { authErrorCodes };
