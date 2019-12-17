const path = require("path");
const expressEdge = require("express-edge");
const express = require("express");
const passport = require("passport");
const localStrategy = require("passport-local");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSessions = require("express-session");
const app = new express();
const User = require("./database/models/User.js");

app.use(
  expressSessions({
    secret: "i am batman",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

mongoose.connect("mongodb://localhost/node-js-blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(blogRoutes);
app.use(userRoutes);
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
