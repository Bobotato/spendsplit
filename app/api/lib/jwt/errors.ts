class MissingEnvError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, MissingEnvError.prototype);
  }
}

export { MissingEnvError };
