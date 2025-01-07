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

router.post("/", passport.authenticate("jwt", { session: false }), createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

router.post("/:postId/comments", createComment);
router.get("/:postId/comments", getCommentsByPost);
router.put("/:postId/comments/:id", updateComment);
router.delete("/:postId/comments/:id", deleteComment);

module.exports = router;
