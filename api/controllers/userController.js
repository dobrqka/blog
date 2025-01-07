const prisma = require("../models/prismaClient");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { email, password, username, status } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: username || "NULL",
        status: status || "USER",
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({
        error: `A user with this ${error.meta.target} already exists.`,
      });
    } else {
      res
        .status(500)
        .json({ error: "Error creating user", details: error.message });
    }
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching users", details: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { email, password, username, status } = req.body;
    let updatedUser;

    const updateData = {};
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (username) updateData.username = username;
    if (status) updateData.status = status;

    if (Object.keys(updateData).length > 0) {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
    }

    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating user", details: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting user", details: error.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
