export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}
export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

export class ServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}
