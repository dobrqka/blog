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

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/:userId/comments", getCommentsByUser);
router.get("/:userId/posts", getPostsByUser);

module.exports = router;
