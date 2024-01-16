import bcrypt from 'bcrypt'
import { User } from '../Model/users.js';
import { sendCookie } from '../Utils/cookie.js';
import { handleError } from '../Middleware/error.js';


export const reg = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return handleError(res, 400, "This email already exists");
    }

    const hashedPass = await bcrypt.hash(password, 9);

    user = await User.create({ name, email, password: hashedPass });
    sendCookie(user, res, "User registered Successfully", 201);
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return handleError(res, 400, "Account doesn't exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleError(res, 400, "Incorrect Credentials");
    }

    sendCookie(user, res, "User Logged in", 200);
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Internal Server Error");
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Internal Server Error");
  }
};

export const getprofile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Internal Server Error");
  }
};