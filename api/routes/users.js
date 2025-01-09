const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  validateUser,
} = require("../controllers/userController");
const { getCommentsByUser } = require("../controllers/commentController");
const { getPostsByUser } = require("../controllers/postController");
const passport = require("../config/passport");

router.post("/", validateUser, createUser);
router.get("/", passport.authenticate("jwt", { session: false }), getUsers);
router.get("/:id", getUserById);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

router.get("/:userId/comments", getCommentsByUser);
router.get("/:userId/posts", getPostsByUser);

module.exports = router;
