const passport = require("passport");
const User = require("../database/models/User");

exports.getUser = (req, res) => {
  res.render("register");
};

exports.postUser = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username
  });
  User.register(newUser, req.body.password, error => {
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

exports.postLogin = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, err => {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.render("index");
      });
    }
  });
};

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect("/login");
};
