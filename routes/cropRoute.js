const express = require("express");
const router = express.Router();
const { validatorMiddleware } = require("../middleware/validatorMiddleware");
const multer = require("multer");
const path = require("path");

/**@Image_Uploader */
const Storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: Storage });

/**@import crop type validators  */
const { cropValidator } = require("../validators/cropValidator");

/**@import @auth_middleware */
const { protect } = require("../middleware/authMiddleware");

/**@import Crop type CRUD functions from user controller */
const {
  createCrop,
  getCrops,
  getSpecificCrop,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropController");

router
  .route("/")
  .post(
    protect,
    upload.single("cropImage"),
    cropValidator,
    validatorMiddleware,
    createCrop
  );
router.route("/").get(protect, getCrops);
router.route("/:id").get(protect, getSpecificCrop);
router.route("/:id").patch(protect, updateCrop);
router.route("/:id").delete(protect, deleteCrop);

module.exports = router;
