const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const postRoutes = require("./posts");
const commentRoutes = require("./comments");
const loginRoutes = require("./login");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/login", loginRoutes);

module.exports = router;
