const jwt = require("jsonwebtoken");
const prisma = require("../models/prismaClient");

const verifyToken = async (req, res) => {
  const token = req.body.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      valid: true,
      message: "Token is valid",
      user,
    });
  } catch (error) {
    res.status(401).json({
      valid: false,
      error: "Invalid or expired token",
      details: error.message,
    });
  }
};

module.exports = { verifyToken };
