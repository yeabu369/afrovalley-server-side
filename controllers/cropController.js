const asyncHandler = require("express-async-handler");

/**@import @Crop model */
const Crop = require("../models/Crops");

/**
 * @description To create crop
 * @api api/v1/crops
 * @access Private
 * @type POST
 */

const createCrop = asyncHandler(async (req, res, next) => {
  // const cloudinary = require("cloudinary");
  // cloudinary.config({
  //   cloud_name: "",
  //   api_key: "",
  //   api_secret: "",
  // });
  // upload(req, res, next);
  const {
    name,
    source,
    quality,
    quantity,
    screenSize,
    cupTest,
    grade,
    processMethod,
    discount,
    deliveryPrice,
    origin,
    region,
    soilType,
    altitude,
    moisture,
    cropYear,
    price,
  } = req.body;

  console.log(req.file, "file uploader");

  try {
    const cropExist = await Crop.findOne({ name });
    if (cropExist)
      return res.status(409).json({
        success: false,
        message: "Crop already exists",
      });
    const crop = await Crop.create({
      name,
      source,
      quality,
      quantity,
      screenSize,
      cupTest,
      grade,
      processMethod,
      discount,
      deliveryPrice,
      origin,
      region,
      soilType,
      altitude,
      moisture,
      cropYear,
      price,
      imagePath: req.file.filename,
      owner: req.userData.id,
    });

    if (crop) {
      res.status(201).json({
        success: true,
        message: "Crop  created successfully",
        data: crop,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Crop data",
      });
      res.json(req.file);
    }
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Get crop
 * @api api/v1/crops/:id
 * @access private
 * @type POST
 */
const getSpecificCrop = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const crop = await Crop.findById({ _id: id });

    if (crop) {
      res.status(200).json({
        success: true,
        data: crop,
      });
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Get Crops
 * @api api/v1/crops/
 * @access private
 * @type GET
 */
const getCrops = asyncHandler(async (req, res) => {
  try {
    const isDeleted = { isDeleted: false };
    const crops = await Crop.find(isDeleted);

    res.status(200).json({
      success: true,
      data: crops,
    });
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Update crop
 * @api api/v1/crops/:id
 * @access private
 * @type PATCH
 */
const updateCrop = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    name,
    source,
    quality,
    quantity,
    screenSize,
    cupTest,
    grade,
    processMethod,
    discount,
    deliveryPrice,
    origin,
    region,
    soilType,
    altitude,
  } = req.body;

  try {
    const crop = await Crop.findById({ _id: id });
    const cropExist = (await crop.isDeleted) === true;
    if (cropExist) {
      res.status(400);
      throw new Error("Crop not found");
    } else {
      const updateData = {
        name,
        name,
        source,
        quality,
        quantity,
        screenSize,
        cupTest,
        grade,
        processMethod,
        discount,
        deliveryPrice,
        origin,
        region,
        soilType,
        altitude,
        owner: req.userData.id,
      };

      const updatedCrop = await Crop.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (updatedCrop) {
        res.status(201).json({
          success: true,
          message: "Crop  updated successfully",
          data: updatedCrop,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid Crop data",
        });
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Delete crop
 * @api api/v1/crops/:id
 * @access private
 * @type PATCH
 */
const deleteCrop = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const isDeleted = {
      isDeleted: true,
    };

    const crop = await Crop.findById({ _id: id });
    const cropExist = (await crop.isDeleted) === true;
    if (cropExist) {
      res.status(400);
      throw new Error("Crop not found");
    } else {
      const deletedCrop = await CropType.findByIdAndUpdate(id, isDeleted);
      if (deletedCrop) {
        res.status(201).json({
          success: true,
          message: "Crop deleted successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid crop  data",
        });
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createCrop,
  getSpecificCrop,
  getCrops,
  updateCrop,
  deleteCrop,
};
