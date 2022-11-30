const express = require("express");
const router = express.Router();
const postsRouter = require("./posts.js");
const commentRouter = require("./comment.js");

router.use("/", [postsRouter, commentRouter]);

router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;
