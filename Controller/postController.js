const path = require("path");
const Post = require("../database/models/Post");
exports.getIndex = async (req, res) => {
  const posts = await Post.find({});
  // console.log(posts);
  res.render("index", {
    posts
  });
};
exports.getCreate = (req, res) => {
  res.render("create");
};

exports.postStore = (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "../public/posts", image.name), error => {
    Post.create(
      {
        ...req.body,
        image: `/posts/${image.name}`
      },
      (error, post) => {
        res.redirect("/");
      }
    );
  });
};

exports.getAbout = (req, res) => {
  res.render("about");
};

exports.getBlog = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post
  });
};

exports.getContact = (req, res) => {
  res.render("contact");
};
