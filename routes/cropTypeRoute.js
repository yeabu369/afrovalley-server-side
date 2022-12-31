const express = require("express");
const router = express.Router();
const { validatorMiddleware } = require("../middleware/validatorMiddleware");

/**@import crop type validators  */
const { cropTypeValidator } = require("../validators/cropTypeValidators");

/**@import @auth_middleware */
const { protect } = require("../middleware/authMiddleware");

/**@import Crop type CRUD functions from user controller */
const {
  createCropType,
  getSpecificCropType,
  getCropTypes,
  updatedCropType,
  deleteCropType,
} = require("../controllers/cropTypeController");

/**@all user routes */
router.route("/").post(cropTypeValidator, validatorMiddleware, createCropType);
router.route("/").get(getCropTypes);
router.route("/:id").get(getSpecificCropType);
router.route("/:id").patch(updatedCropType);
router.route("/:id").delete(deleteCropType);

module.exports = router;
