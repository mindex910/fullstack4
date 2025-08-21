const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: "Required field missing" });
  }
  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformatted id" });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Token missing or invalid" });
  }
  next(error)
};
module.exports = errorHandler;
