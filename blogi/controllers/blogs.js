const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const tokenExtractor = require("../middlewares/tokenExtractor")
const userExtractor = require("../middlewares/userExtractor");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})


blogsRouter.post("/", tokenExtractor, userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    const body = request.body;

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

blogsRouter.delete("/:id", tokenExtractor, userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response
        .status(403)
        .json({ error: "only the creator can delete this blog" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const payload = { likes: blog.likes };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, payload, { new: true });
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
