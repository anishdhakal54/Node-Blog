const User = require("../database/models/User");
exports.getUser = (req, res) => {
  res.render("register");
};

exports.postUser = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      console.log(error);
    }
    user.save();
    res.redirect("/");
  });
};
