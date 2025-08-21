const express = require("express");
const app = express();
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "ValidationError") {
  return response.status(400).json({ error: "Required field missing" })
  }
  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformatted id" })
  }
  return response.status(500).json({ error: "Something went wrong" })
}

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});