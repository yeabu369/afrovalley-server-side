const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../constants/index");
const jwt = require("jsonwebtoken");

/**@import @User model */
const User = require("../models/Users");

/**
 * @description To create admin user
 * @api api/v1/signup
 * @access public
 * @type POST
 */
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.userData);

  /**@check if user exists*/
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  /**@hash password*/
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  /**@create user*/
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid user data",
    });
  }
});

/**
 * @description User login
 * @api api/v1/login
 * @access public
 * @type POST
 */
const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }
  let userInfo = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      success: true,
      data: userInfo,
      accessToken: generateToken(user._id),
      message: "You are logged in successfully!!!",
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  if (!checkPassword) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password.",
    });
  }
});

/**@generate JWT*/
const generateToken = (id) => {
  return jwt.sign({ id }, SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  signUp,
  login,
};
