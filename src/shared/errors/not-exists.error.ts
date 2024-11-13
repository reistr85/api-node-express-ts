export class NotExistsError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'Not Exists Error';
    this.statusCode = 409;
    Error.captureStackTrace(this, this.constructor);
  }
}
