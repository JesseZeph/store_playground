//message, status code, error codes, error

export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: ErrorCode;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  PRODUCT_NOT_FOUND = 1011,
  ADDRESS_NOT_FOUND = 1012,
  ORDER_NOT_FOUND = 1013,
  ADDRESS_DOES_NOT_BELONG = 1022,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  UNPROCCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED = 4001,
}
