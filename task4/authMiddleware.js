const jwt = require("jsonwebtoken");
const { User } = require("../models");

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "authentication token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "user not found" });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "invalid or expired token" });
  }
};
