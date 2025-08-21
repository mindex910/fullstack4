const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", (request, response) => {
  Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const user = await User.findById(body.userId);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ?? 0,
      user: user._id,
    });
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const payload = { likes: blog.likes };
  await Blog.findByIdAndUpdate(request.params.id, payload, { new: true });
  response.status(200).end();
});

module.exports = blogsRouter;
