const User = require("../database/models/User");
const passport = require("passport");

exports.getUser = (req, res) => {
  res.render("register");
};

exports.postUser = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      console.log(error);
      return res.redirect("/users/register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
};
exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};
