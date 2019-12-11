const path = require("path");
const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const Post = require("./database/models/Post");

const blogRoutes = require("./routes/blogRoutes");
const app = new express();

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
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
