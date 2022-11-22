const express = require("express");
const router = express.Router();
const { validatorMiddleware } = require("../middleware/validatorMiddleware");

/**@import employee validators  */
const {
  SignUpValidations,
  AuthenticateValidations,
} = require("../validators/employeeValidator");

/**@import employee CRUD functions from employee controller */
const { signUp } = require("../controllers/employeeController");

/**@all employee routes */
router.route("/create").post(SignUpValidations, validatorMiddleware, signUp);

module.exports = router;
