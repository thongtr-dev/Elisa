const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

export { notFound, errorHandler };
