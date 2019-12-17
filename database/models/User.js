const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", userSchema);
