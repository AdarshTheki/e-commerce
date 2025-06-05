export class ApiSuccess {
  constructor(data, message = "Data fetch success", code = 200) {
    this.code = code;
    this.message = message;
    this.status = code <= 400;
    this.data = data;
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
