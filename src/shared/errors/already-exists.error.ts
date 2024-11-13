export class AlreadyExistsError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExistsError';
    this.statusCode = 409;
    Error.captureStackTrace(this, this.constructor);
  }
}
