import Jwt from "jsonwebtoken";
import { User } from "../Model/users.js";

export const auth = async (req, res, next) => {
  const token = req.cookies['token'];
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First!",
    });
  }
  const decodedtoken = Jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedtoken._id);
  next();
};
