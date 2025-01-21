const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  validatePost,
} = require("../controllers/postController");
const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  validateComment,
} = require("../controllers/commentController");
const passport = require("../config/passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatePost,
  createPost
);
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

router.post(
  "/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  createComment
);
router.get("/:postId/comments", getCommentsByPost);
router.put(
  "/:postId/comments/:id",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  updateComment
);
router.delete(
  "/:postId/comments/:id",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

module.exports = router;
