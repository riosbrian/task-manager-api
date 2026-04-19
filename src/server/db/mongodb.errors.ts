export function handleMongoDbErrors(err: any) {
  // 1. Duplicate Fields (MongoDB Driver)
  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return { statusCode: 400, status: "fail", message };
  }

  // 2. Malformed ID (Mongoose CastError)
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return { statusCode: 400, status: "fail", message };
  }

  // 3. Validation Error (Mongoose ValidationError)
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data: ${errors.join(". ")}`;
    return { statusCode: 400, status: "fail", message };
  }

  return null;
}
