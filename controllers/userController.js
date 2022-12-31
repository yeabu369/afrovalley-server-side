const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../constants/index");
const jwt = require("jsonwebtoken");

/**@import @User model */
const User = require("../models/Users");

/**
 * @description To signup
 * @api api/v1/signup
 * @access public
 * @type POST
 */
const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, marketTypes, userType } =
    req.body;

  try {
    /**@check if user exists*/
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(409).json({
        success: false,
        message: "User already exists",
      });
    } else {
      /**@hash password*/
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      /**@create user*/
      const user = await User.create({
        firstName,
        lastName,
        userType,
        email,
        marketTypes,
        password: hashPassword,
      });

      if (user) {
        res.status(201).json({
          success: true,
          message: "User created successfully",
          accessToken: generateToken(user._id),
          data: user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid user data",
        });
      }
    }
  } catch (e) {
    throw new Error(e);
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
  try {
    const user = await User.findOne({ email });
    /**@check if user exists*/
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Email not found.",
      });
    } else {
      let userInfo = {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      };
      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
          success: true,
          data: userInfo,
          accessToken: generateToken(user._id),
          message: "You are logged in successfully!!!",
        });
      } else {
        res.status(409).json({
          success: false,
          message: "Invalid credentials",
        });
        // throw new Error("Invalid credentials");
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Get Users
 * @api api/v1/users/:id
 * @access public
 * @type POST
 */
const getUserData = asyncHandler(async (req, res) => {
  try {
    const id = req.userData.id;
    const user = await User.findById({ _id: id });

    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Get Users
 * @api api/v1/users/
 * @access public
 * @type GET
 */
const getUsers = asyncHandler(async (req, res) => {
  try {
    const isDeleted = { isDeleted: false };
    const users = await User.find(isDeleted);

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Update user
 * @api api/v1/user/:id
 * @access private
 * @type PATCH
 */
const updateUser = asyncHandler(async (req, res) => {
  const id = req.userData.id;
  const { firstName, lastName, userType, email } = req.body;

  try {
    const user = await User.findById({ _id: id });
    const userExist = (await user.isDeleted) === true;
    if (userExist) {
      res.status(400);
      throw new Error("User not found");
    } else {
      const updateData = {
        firstName,
        lastName,
        userType,
        email,
      };

      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (updatedUser) {
        res.status(201).json({
          success: true,
          message: "User updated successfully",
          data: updatedUser,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid user data",
        });
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Delete user
 * @api api/v1/user/:id
 * @access private
 * @type PATCH
 */
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.userData.id;
  try {
    const isDeleted = {
      isDeleted: true,
    };

    const user = await User.findById({ _id: id });
    const userNotExist = (await user.isDeleted) === true;
    if (userNotExist) {
      res.status(400);
      throw new Error("User not found");
    } else {
      const deletedUser = await User.findByIdAndUpdate(id, isDeleted);
      if (deletedUser) {
        res.status(201).json({
          success: true,
          message: "User deleted successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid user data",
        });
      }
    }
  } catch (e) {
    throw new Error(e);
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
  getUserData,
  getUsers,
  updateUser,
  deleteUser,
};
