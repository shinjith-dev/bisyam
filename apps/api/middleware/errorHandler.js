const errorHandler = (error, req, res, next) => {
  const customError = {
    status: error.statusCode || 500,
    message: error.message || "Something went wrong try again later",
    success: false,
  };

  if (error.name === "ValidationError") {
    customError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
    customError.status = 400;
  }

  if (error.code && error.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      error.keyValue,
    )} field, please choose another value`;
    customError.status = 400;
  }

  if (error.name === "ValidationError") {
    const errors = [];

    Object.keys(error.errors).forEach((key) => {
      const issue = [key, error.errors[key].message];
      errors.push(issue.join(": "));
    });

    customError.message = `Validation error. ${errors.join("; ")}`;
    customError.status = 400;
  }

  if (error.name === "CastError") {
    customError.message = `No item found with id : ${JSON.stringify(
      error.value,
    )}`;
    customError.status = 400;
  }

  if (error.name === "TokenExpiredError") {
    customError.message = "token expired";
    customError.status = 400;
  }

  return res.status(customError.status).json({
    message: customError.message,
    success: customError.success,
  });
};

module.exports = errorHandler;
