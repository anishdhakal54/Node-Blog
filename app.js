const path = require("path");
const { config, engine } = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./database/models/Post");
const expressFileUpload = require("express-fileupload");

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

app.use(expressFileUpload());

app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", {
    posts
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id, (err, post) => {
    res.render("post", {
      post
    });
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  const image = req.files.image;
  if (image) {
    image.mv(`${__dirname}/public/image/filename.png`, err => {
      Post.create(req.body, (err, post) => {
        res.redirect("/");
      });
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
