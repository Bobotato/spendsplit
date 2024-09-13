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

export class GroupIDCollisionError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "GroupIDCollisionError";
  }
}

export class TransactionIDCollisionError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "TransactionIDCollisionError"
  }
}

export class UserNotFoundError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export class GroupNotFoundError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "GroupNotFoundError"
  }
}

export class NoMembersFoundError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "NoMembersFoundError"
  }
}


export class TransactionNotFoundError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "TransactionNotFoundError"
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
