const express = require("express");
const router = express.Router();
const { validatorMiddleware } = require("../middleware/validatorMiddleware");

/**@import user validators  */
const {
  SignUpValidations,
  AuthenticateValidations,
} = require("../validators/userValidator");

/**@import @auth_middleware */
const { protect } = require("../middleware/authMiddleware");

/**@import user CRUD functions from user controller */
const {
  signUp,
  login,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

/**@all user routes */
router
  .route("/create")
  .post(protect, SignUpValidations, validatorMiddleware, signUp);
router
  .route("/login")
  .post(AuthenticateValidations, validatorMiddleware, login);
router.route("/").get(getUsers);
router.route("/update/:id").patch(protect, updateUser);
router.route("/delete/:id").delete(protect, deleteUser);

module.exports = router;
