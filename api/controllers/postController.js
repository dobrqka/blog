const prisma = require("../models/prismaClient");

const createPost = async (req, res) => {
  const { title, content, status } = req.body;
  try {
    const ownerId = req.user.id;

    const newPost = await prisma.post.create({
      data: {
        ownerId,
        title,
        content,
        status: status || "UNPUBLISHED",
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
    const { title, content, status, comments } = req.body;
    let updatedPost;

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (status) updateData.status = status;
    if (comments) updateData.comments = comments;

    if (Object.keys(updateData).length > 0) {
      const updatedPost = await prisma.post.update({
        where: { id: Number(req.params.id) },
        data: updateData,
      });
    }
    res.json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating post", details: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await prisma.post.delete({
      where: {
        id: Number(req.params.id),
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
};
