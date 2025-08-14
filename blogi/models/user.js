require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../utils/config");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
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
