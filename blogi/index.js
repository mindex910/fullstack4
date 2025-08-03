const express = require("express");
const app = express();
const Blog = require("./models/blogs");

app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

app.delete("/api/blogs/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

app.put("/api/blogs/:id", async (request, response) => {
  const blog = request.body
  const payload = {likes: blog.likes}
  await Blog.findByIdAndUpdate(request.params.id, payload, {new: true})
  response.status(200).end()
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
