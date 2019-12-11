const express = require("express");
const router = express.Router();
const postController = require("../Controller/postController");

router.get("/", postController.getIndex);

router.get("/posts/new", postController.getCreate);

router.post("/posts/store", postController.postStore);

router.get("/about", postController.getAbout);

router.get("/post/:id", postController.getBlog);

router.get("/contact", postController.getContact);

module.exports = router;
