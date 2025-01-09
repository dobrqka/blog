const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  validateComment,
} = require("../controllers/commentController");
const passport = require("../config/passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  createComment
);
router.get("/", getComments);
router.get("/:id", getCommentById);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  updateComment
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

module.exports = router;
