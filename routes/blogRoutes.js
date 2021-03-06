const express = require("express");
const router = express.Router();
const postController = require("../Controller/postController");
const middleware = require("../middleware/createPostMiddleware.js");

router.get("/", postController.getIndex);
router.get("/posts/new", postController.getCreate);
router.post(
  "/posts/store",
  middleware.createBlogMiddleware,
  postController.postStore
);

router.get("/post/:id", postController.getBlog);

router.get("/contact", postController.getContact);

module.exports = router;
