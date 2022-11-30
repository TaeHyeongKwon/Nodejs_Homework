const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comment.js");
const Posts = require("../schemas/post.js");

const moment = require("moment");

//댓글 생성 API
router.post("/comment/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { user, password, content } = req.body;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const post = await Posts.findOne({ _id: postId });
    if (!content) {
      res.status(400).json({ message: "댓글 내용을 입력해주세요" });
    } else if (!user || !password) {
      throw error;
    } else if (postId === post._id.toString()) {
      await Comment.create({ user, password, content, createdAt, postId });
      return res.status(201).json({ message: "댓글을 생성하였습니다." });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

//댓글 조회 API
router.get("/comment/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = await Comment.find(
      { postId },
      { _id: true, user: true, content: true, createdAt: true }
    ).sort({ createdAt: -1 });
    if (comment.toString() === "") {
      throw error;
    }
    return res.status(200).json({ comment });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

//댓글 수정 API
router.put("/comment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { password, content } = req.body;
    const comment = await Comment.findOne({ _id: commentId });
    if (!content) {
      return res.status(400).json({ message: "댓글 내용을 입력해 주세요." });
    } else if (!password || password !== comment.password) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
    if (password === comment.password) {
      await Comment.updateOne(
        { _id: commentId },
        { $set: { content: content } }
      );
    }
    res.status(201).json({ message: "댓글을 수정하였습니다." });
  } catch (error) {
    return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
  }
});

//댓글 삭제 API
router.delete("/comment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { password } = req.body;
    const comment = await Comment.findOne({ _id: commentId });
    if (!password || password !== comment.password) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
    if (password === comment.password)
      await Comment.deleteOne({ _id: commentId });
    return res.status(200).json({ message: "댓글을 삭제하였습니다." });
  } catch {
    return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
  }
});

module.exports = router;
