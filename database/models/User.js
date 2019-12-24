const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", userSchema);
