const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
router.get("/users/register", userController.getUser);
router.post("/users/register", userController.postUser);
router.get("/users/login", userController.getLogin);
router.post("/users/login", userController.postLogin);
module.exports = router;
