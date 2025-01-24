const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const postRoutes = require("./posts");
const commentRoutes = require("./comments");
const loginRoutes = require("./login");
const tokenRoutes = require("./token");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/login", loginRoutes);
router.use("/verify-token", tokenRoutes);

module.exports = router;
