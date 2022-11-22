const { body, query, params } = require("express-validator");

/**@list_of_attributes for validation */
const name = body("name").isString().withMessage("Name is required.");
const email = body("email")
  .isEmail()
  .withMessage("Please enter a valid email.");
const password = body("password")
  .isLength({
    min: 8,
    max: 16,
  })
  .withMessage("Please enter a password a minimum of 8 characters.");

const dateOfBirth = body("dateOfBirth")
  .isDate()
  .withMessage("Date of birth is required.");
const gender = body("gender").isString().withMessage("Gender is required.");
const salary = body("salary").isNumeric().withMessage("Salary is required.");

/**@create_employee validation */
const SignUpValidations = [name, email, password, dateOfBirth, gender, salary];

/**@login_employee validation */
const AuthenticateValidations = [email, password];

module.exports = {
  SignUpValidations,
  AuthenticateValidations,
};
