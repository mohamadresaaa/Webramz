const jwt = require("jsonwebtoken");
const { User } = require("../models");

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "authentication token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp - currentTime < 300) {
      const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.header("Authorization", `Bearer ${newToken}`);
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid or expired token" });
  }
};
