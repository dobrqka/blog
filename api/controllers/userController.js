const prisma = require("../models/prismaClient");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .notEmpty()
    .withMessage("Email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .notEmpty()
    .withMessage("Password is required"),

  body("username")
    .optional()
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"),

  body("status")
    .optional()
    .isIn(["USER", "ADMIN"])
    .withMessage("Invalid status value"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

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
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        email: true,
        username: true,
        status: true,
        posts: true,
        comments: true,
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
    const authenticatedUserId = Number(req.user.id);
    const authenticatedUserStatus = req.user.status;
    const { email, password, username, status } = req.body;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (userId !== authenticatedUserId && authenticatedUserStatus !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this account" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (status === "ADMIN" && authenticatedUserStatus !== "ADMIN") {
      return res.status(403).json({
        error: "You are not authorized to change the status to ADMIN",
      });
    }

    if (
      user.status === "ADMIN" &&
      status !== undefined &&
      status !== "ADMIN" &&
      authenticatedUserStatus === "ADMIN"
    ) {
      return res.status(403).json({
        error:
          "Admins cannot change status from ADMIN to USER or any other role",
      });
    }

    let updatedUser;
    const updateData = {};
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (username) updateData.username = username;
    // if (status) updateData.status = status;
    if (status && status === "ADMIN" && authenticatedUserStatus === "ADMIN") {
      updateData.status = status;
    }

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
    const userId = Number(req.params.id);
    const authenticatedUserId = req.user.id;
    const authenticatedUserStatus = req.user.status;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (userId !== authenticatedUserId && authenticatedUserStatus !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this account" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting user", details: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  validateUser,
};
