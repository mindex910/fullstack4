require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../utils/config");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required"],
    unique: [true, "username must be unique"],
    minlength: [3, "username must be over 3 characters"],
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
}]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const mongoUrl = config.MONGODB;
mongoose.connect(mongoUrl);

module.exports = mongoose.model("User", userSchema);
