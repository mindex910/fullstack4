const express = require("express")
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const errorHandler = require("./middlewares/errorHandler")
const tokenExtractor = require("./middlewares/tokenExtractor")
const userExtractor = require("./middlewares/userExtractor")

const app = express()
app.use(cors())

app.use(express.json())

app.use(tokenExtractor)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(errorHandler)

module.exports = app