require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../utils/config");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})


blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const mongoUrl = config.MONGODB;
mongoose.connect(mongoUrl);

module.exports = mongoose.model("Blog", blogSchema);
