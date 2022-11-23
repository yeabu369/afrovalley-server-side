const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../constants/index");
const jwt = require("jsonwebtoken");

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
      da: req.userData.id,
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
  // const user = User.findById(id);
  // // const condition = (await user.isDeleted) === true;

  // console.log(id);
  // User.findById(id, function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Result : ", docs);
  //   }
  // });
  console.log(User.findById(id));
  // if (condition) {
  //   req.status(400);
  //   throw new Error("User not found");
  // }
  // const { name, email, password, dateOfBirth, salary, createdBy, gender } =
  //   req.body;

  // /**@hash password if user changes his password*/
  // let hashPassword;
  // if (password) {
  //   const newPassword = password;
  //   const salt = await bcrypt.genSalt(10);
  //   return (hashPassword = await bcrypt.hash(newPassword, salt));
  // }

  // const updatedUser = {
  //   name,
  //   email,
  //   password: hashPassword,
  //   dateOfBirth,
  //   salary,
  //   createdBy,
  //   gender,
  //   updatedBy: req.userData.id,
  // };
  // const updateUser = await User.findByIdAndUpdate(req.params.id, updatedUser);
  // res.status(200).json({
  //   message: "User updated successfully",
  //   data: updateUser,
  // });
  // if (updateUser) {
  //   res.status(201).json({
  //     success: true,
  //     message: "User created successfully",
  //     data: user,
  //     pass: hashPassword,
  //   });
  // } else {
  //   res.status(400).json({
  //     success: false,
  //     message: "Invalid user data",
  //   });
  // }
});

/**@generate JWT*/
const generateToken = (id) => {
  return jwt.sign({ id }, SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  signUp,
  login,
  getUsers,
  updateUser,
};
