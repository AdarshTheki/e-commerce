export class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export const success = (
  data,
  message = "get fetch data success",
  statusCode = 200
) => {
  return {
    data,
    message,
    statusCode,
    success: true,
  };
};

export const error = (message = "something want wrong!", statusCode = 500) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    statusCode,
    success: false,
  };
};
