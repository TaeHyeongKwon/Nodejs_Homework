const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post.js");
const moment = require("moment");

//게시글 생성 API
router.post("/posts", async (req, res) => {
  try {
    const { user, password, title, content } = req.body;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    if (!user || !password || !title || !content) {
      throw error;
    }
    await Posts.create({
      user,
      password,
      title,
      content,
      createdAt,
    });
    return res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다.1" });
  }
});

//게시글 조회 API
router.get("/posts", async (req, res) => {
  const data = await Posts.find(
    {},
    { _id: true, user: true, title: true, createdAt: true }
  ).sort({ createdAt: -1 });
  return res.status(200).json({ data });
});

//게시글 상세조회 API
router.get("/posts/:postId", async (req, res) => {
  try {
    let result = null;
    const { postId } = req.params;
    const posts = await Posts.find(
      {},
      { _id: true, user: true, title: true, content: true, createdAt: true }
    );
    for (const post of posts) {
      if (postId == post._id) {
        result = post;
      }
    }
    if (result == null) {
      throw error;
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// 게시글 수정 API
router.put("/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { password, title, content } = req.body;
    if (!password || !title || !content) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다.3" });
    }
    const posts = await Posts.findOne({ _id: postId });
    if (password === posts.password) {
      await Posts.updateOne(
        { _id: postId },
        { $set: { title: title, content: content } }
      );
      return res.status(201).json({ message: "게시글을 수정하였습니다." });
    } else {
      return res.status(400).json({ message: "비밀번호가 다릅니다." });
    }
  } catch (error) {
    return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
  }
});

//게시글 삭제 API
router.delete("/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { password } = req.body;
    const posts = await Posts.findOne({ _id: postId });
    if (!password) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다.4" });
    }
    if (password === posts.password) {
      await Posts.deleteOne({ _id: postId });
    }
    return res.status(200).json({ message: "게시글을 삭제하였습니다." });
  } catch {
    return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
  }
});

module.exports = router;
