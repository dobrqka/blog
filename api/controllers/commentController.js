const prisma = require("../models/prismaClient");

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
    const updatedComment = await prisma.comment.update({
      where: {
        id: Number(req.params.id),
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
    await prisma.comment.delete({
      where: { id: Number(req.params.id) },
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
};
