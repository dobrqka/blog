const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../models/prismaClient");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { login };
