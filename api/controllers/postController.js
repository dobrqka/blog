const prisma = require("../models/prismaClient");
const { body, validationResult } = require("express-validator");

const validatePost = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title cannot exceed 255 characters"),

  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content is required"),

  body("status")
    .optional()
    .isIn(["PUBLISHED", "UNPUBLISHED"])
    .withMessage("Invalid status value"),

  body("thumbnail")
    .isString()
    .withMessage("Thumbnail must be a string URL")
    .notEmpty()
    .withMessage("Thumbnail is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const createPost = async (req, res) => {
  const { title, content, status, thumbnail } = req.body;
  try {
    const ownerId = req.user.id;
    const newPost = await prisma.post.create({
      data: {
        ownerId,
        title,
        content,
        status: status || "UNPUBLISHED",
        thumbnail,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating post", details: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching posts", details: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching post", details: error.message });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        ownerId: Number(req.params.userId),
      },
    });
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching posts", details: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, status, comments, thumbnail } = req.body;
    const postId = Number(req.params.id);
    const userId = req.user.id;
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not the owner of this post" });
    }

    const updateData = {};
    let updatedPost;

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (status) updateData.status = status;
    if (comments) updateData.comments = comments;
    if (thumbnail) updateData.thumbnail = thumbnail;

    if (Object.keys(updateData).length > 0) {
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: updateData,
      });
      return res.json(updatedPost);
    }
    return res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating post", details: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.user.id;
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not the owner of this post" });
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting post", details: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
  validatePost,
};
