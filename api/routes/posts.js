const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const {
  createComment,
  getCommentsByPost,
} = require("../controllers/commentController");

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.post("/:postId/comments/", createComment);
router.get("/:postId/comments", getCommentsByPost);

module.exports = router;
