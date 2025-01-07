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
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const passport = require("../config/passport");

// router.post("/", createPost); // unprotected route
router.post("/", passport.authenticate("jwt", { session: false }), createPost); // protected
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.post("/:postId/comments", createComment);
router.get("/:postId/comments", getCommentsByPost);
router.put("/:postId/comments/:id", updateComment);
router.delete("/:postId/comments/:id", deleteComment);

module.exports = router;
