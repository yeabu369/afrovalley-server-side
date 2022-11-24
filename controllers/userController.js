const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
// const { SECRET } = require("../constants/index");
const jwt = require("jsonwebtoken");

const SECRET = "THISISSECRET";
/**@import @User model */
const User = require("../models/Users");

/**
 * @description To create a new User/signup
 * @api api/v1/user/create
 * @access public
 * @type POST
 */
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, dateOfBirth, salary, gender } = req.body;
  console.log(req.userData);

  /**@check if user exists*/
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(409).json({
      status: 409,
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
    dateOfBirth,
    salary,
    gender,
    createdBy: req.userData.id,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } else {
    res.status(400).json({
      status: 400,
      success: false,
      message: "Invalid user data",
    });
  }
});

/**
 * @description User login
 * @api api/v1/user/login
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
    password: user.password,
  };
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      status: 200,
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
      status: 401,
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

/**
 * @description Get user
 * @api api/v1/user/
 * @access public
 * @type GET
 */
const getUsers = asyncHandler(async (req, res) => {
  /**@defining total @page per request, @limit and @search */
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";

  const users = await User.find({
    name: { $regex: search, $options: "i" },
    isDeleted: false,
  })
    .skip(page * limit)
    .limit(limit);

  /**@counter for total number of @documents */
  const total = await User.countDocuments({
    name: { $regex: search, $options: "i" },
    isDeleted: false,
  });

  res.status(200).json({
    status: 200,
    data: users,
    total,
    success: true,
    page: page + 1,
    limit,
  });
});

/**
 * @description Update user
 * @api api/v1/user/update
 * @access private
 * @type PATCH
 */
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id });
  const condition = (await user.isDeleted) === true;
  if (condition) {
    res.status(400);
    throw new Error("User not found");
  }
  const { name, email, password, dateOfBirth, salary, createdBy, gender } =
    req.body;

  /**@hash password if user changes his password*/
  const salt = await bcrypt.genSalt(10);
  const hashPassword = password && (await bcrypt.hash(password, salt));

  const updateData = {
    name,
    email,
    password: hashPassword,
    dateOfBirth,
    salary,
    createdBy,
    gender,
    updatedBy: req.userData.id,
  };

  const updatedUser = await User.findByIdAndUpdate(id, updateData);
  if (updatedUser) {
    const newData = await User.findById({ _id: id });
    res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: newData,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid user data",
    });
  }
});

/**
 * @description Delete user, personally i prefer soft deletion, for real deletion i put the code below this function
 * @api api/v1/user/update
 * @access private
 * @type PATCH
 */
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isDeleted = {
    isDeleted: true,
  };

  const user = await User.findById({ _id: id });
  const condition = (await user.isDeleted) === true;

  if (condition) {
    req.status(400);
    throw new Error("User not found");
  }

  const deletedUser = await User.findByIdAndUpdate(req.params.id, isDeleted);
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
});

/**@real deletion or user from the database  */
// const deleteUser = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const isDeleted = {
//     isDeleted: true,
//   };

//   const user = await User.findById({ _id: id });
//   const condition = (await user.isDeleted) === true;

//   if (condition) {
//     req.status(400);
//     throw new Error("User not found");
//   }

//   const deletedUser = await User.findByIdAndDelete(req.params.id);
//   if (deletedUser) {
//     res.status(201).json({
//       success: true,
//       message: "User deleted successfully",
//     });
//   } else {
//     res.status(400).json({
//       success: false,
//       message: "Invalid user data",
//     });
//   }
// });

module.exports = {
  signUp,
  login,
  getUsers,
  updateUser,
  deleteUser,
};
