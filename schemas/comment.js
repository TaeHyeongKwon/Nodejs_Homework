const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  content: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comments", commentsSchema);
