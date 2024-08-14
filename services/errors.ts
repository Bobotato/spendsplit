export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}

export class InvalidCredentialsError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

export class UsernameAlreadyExistsError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "UsernameAlreadyExistsError";
  }
}

export class UserNotFoundError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export class APIResponseMalformedError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "APIResponseMalformedError";
  }
}

export class APIServerDownError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "APIServerDownError";
  }
}

export class UnauthorisedError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorisedError";
  }
}
