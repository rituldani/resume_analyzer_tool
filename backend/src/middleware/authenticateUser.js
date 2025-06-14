import jwt from 'jsonwebtoken';
import { User } from "../models/user.models.js"

export const authenticateUser = async (req, res, next) => {
  console.log("first")
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token missing" });
    }

    // console.log(process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    const user = await User.findById(decoded.userId).select('-password');
    // console.log(user);
    console.log("User Found:", user);
    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    req.user = user; // 👈 This attaches the user to the request
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};
