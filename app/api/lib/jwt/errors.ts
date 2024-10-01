class MissingEnvError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, MissingEnvError.prototype);
  }
}

class InvalidJWTError extends Error {
  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, InvalidJWTError.prototype);
  }
}

export { MissingEnvError, InvalidJWTError };
