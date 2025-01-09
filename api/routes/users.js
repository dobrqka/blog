const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { getCommentsByUser } = require("../controllers/commentController");
const { getPostsByUser } = require("../controllers/postController");
const passport = require("../config/passport");

router.post("/", createUser);
router.get("/", passport.authenticate("jwt", { session: false }), getUsers);
router.get("/:id", getUserById);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
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
