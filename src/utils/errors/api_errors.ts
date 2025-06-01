export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UserAlreadyExist extends ApiError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class MaxDataLimitError extends ApiError {
  constructor(message: string) {
    super(message, 429);
  }
}
