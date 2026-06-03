export class AppError extends Error {
  static readonly NOT_FOUND = "Not Found";
  static readonly EMAIL_ALREADY_EXIST = "Email Already Exist";
  static readonly DATE_IS_NOT_VALID = "Date is not valid";
  static readonly INVALID_CREDENTIALS = "Invalid Email or Password";
  static readonly SERVER_ERROR = "Internal Server Error";
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
  static userNotFound() {
    return new NotFoundError("User not found");
  }

  static movieNotFound() {
    return new NotFoundError("Movie not found");
  }

  static resourceNotFound() {
    return new NotFoundError("Resource not found");
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
