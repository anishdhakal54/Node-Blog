const path = require("path");
const { config, engine } = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./database/models/Post");

const app = express();

mongoose.connect("mongodb://localhost/nodeblog", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static("public"));
app.use(engine);

app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/store", (req, res) => {
  Post.create(req.body, (err, post) => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
