const prisma = require("../models/prismaClient");
const { body, validationResult } = require("express-validator");

const validateComment = [
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const createComment = async (req, res) => {
  const { content } = req.body;
  const postId = Number(req.params.postId);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { ownerId: true },
  });

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: post.ownerId,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating comment", details: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching comments", details: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching comment", details: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(req.params.postId),
      },
      include: {
        user: {
          select: {
            email: true,
            username: true,
          },
        },
      },
    });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed fetching comments", details: error.message });
  }
};

const getCommentsByUser = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(req.params.userId),
      },
    });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed fetching comments", details: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = Number(req.params.id);
    const authenticatedUserId = req.user.id;
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const userId = comment.userId;

    if (userId !== authenticatedUserId) {
      return res.status(403).json({
        error:
          "You are not authorized to update this comment. Only the owner can perform this action.",
      });
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: req.body.content,
      },
    });
    res.json(updatedComment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating comment", details: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = Number(req.params.id);
    const authenticatedUserId = req.user.id;
    const authenticatedUserStatus = req.user.status;
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const userId = comment.userId;

    if (userId !== authenticatedUserId && authenticatedUserStatus !== "ADMIN") {
      return res.status(403).json({
        error:
          "You are not authorized to delete this comment. Only the owner or an admin can perform this action.",
      });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting comment", details: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByPost,
  getCommentsByUser,
  validateComment,
};
