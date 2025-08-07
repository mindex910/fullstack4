const express = require("express");
const app = express();
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use(express.json());

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

// HUOM pöytäkoneelle:
// lataa bcrypt !! 7.8. torstai