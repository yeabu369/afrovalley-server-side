const { body, query, params } = require("express-validator");

/**@list_of_attributes for validation */
const firstName = body("firstName")
  .isString()
  .withMessage("First Name is required.");
const lastName = body("lastName")
  .isString()
  .withMessage("Last Name is required.");
const email = body("email")
  .isEmail()
  .withMessage("Please enter a valid email.");
const password = body("password")
  .isLength({
    min: 8,
    max: 16,
  })
  .withMessage("Please enter a password a minimum of 8 characters.");
const userType = body("userType")
  .isBoolean()
  .withMessage("Please enter a user type");
const marketType = body("marketTypes")
  .isArray()
  .optional()
  .withMessage("Please enter a market type");
/**@create_employee validation */
const SignUpValidations = [
  firstName,
  lastName,
  email,
  password,
  userType,
  marketType,
];

/**@login_user validation */
const LoginValidations = [email, password];

module.exports = {
  SignUpValidations,
  LoginValidations,
};
