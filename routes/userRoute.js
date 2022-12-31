const express = require("express");
const router = express.Router();
const { validatorMiddleware } = require("../middleware/validatorMiddleware");

/**@import user validators  */
const {
  SignUpValidations,
  LoginValidations,
} = require("../validators/userValidator");

/**@import @auth_middleware */
const { protect } = require("../middleware/authMiddleware");

/**@import user CRUD functions from user controller */
const {
  signUp,
  login,
  getUserData,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

/**@all user routes */
router.route("/signup").post(SignUpValidations, validatorMiddleware, signUp);
router.route("/login").post(LoginValidations, validatorMiddleware, login);
router.route("/userData").get(protect, getUserData);
router.route("/").get(protect, getUsers);
router.route("/").patch(protect, updateUser);
router.route("/").delete(protect, deleteUser);

module.exports = router;
