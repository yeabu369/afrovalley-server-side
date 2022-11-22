const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");
const Employee = require("../models/Employees");

/**
 * @description To create a new User/signup
 * @api api/v1/user/add
 * @access Public
 * @type POST
 */
const signUp = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, salary, createdBy, gender } =
      req.body;

    /**@check if user exists*/
    const employeeExist = await Employee.findOne({ email });
    if (employeeExist) {
      res.status(409);
      throw new Error("Employee already exists");
    }

    //create user
    const employee = await Employee.create({
      name,
      email,
      password,
      dateOfBirth,
      salary,
      gender,
      // createdBy: req.userData.id,
    });

    //   let token = await employee.generateJWT();
    await employee.save();
    if (employee) {
      res.status(201).json({
        success: true,
        message: "Employee created successfully",
        employee: employee,
        //   token: `Bearer ${token}`,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "Internal Server Error",
    });
  }
});

/**
 * @description User login
 * @api api/v1/auth/signin
 * @access Public
 * @type POST
 */
const login = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;
    let employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }
    let checkPassword = await employee.comparePassword(password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }
    let token = await user.generateJWT();
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      accessToken: `Bearer ${token}`,
      message: "You are logged in successfully!!!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = {
  signUp,
  login,
};
