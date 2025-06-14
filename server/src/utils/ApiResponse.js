export class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export class ApiError extends Error {
  constructor(
    message = "something went wrong!",
    statusCode,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const success = (
  data = null,
  message = "Data fetched successfully",
  code = 200
) => {
  return {
    status: code <= 400,
    code,
    message,
    data,
  };
};

export const error = (message = "Something went wrong!", code = 500) => {
  return {
    status: code <= 400,
    code,
    message,
  };
};
