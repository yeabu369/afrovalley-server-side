const asyncHandler = require("express-async-handler");

/**@import @CropType model */
const CropType = require("../models/CropType");

/**
 * @description To create crop type
 * @api api/v1/crop-type
 * @access public
 * @type POST
 */
const createCropType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const cropTypeExist = await CropType.findOne({ name });
    if (cropTypeExist) {
      res.status(409).json({
        success: false,
        message: "Crop already exists",
      });
    } else {
      const cropType = await CropType.create({
        name,
      });

      if (cropType) {
        res.status(201).json({
          success: true,
          message: "Crop type created successfully",
          data: cropType,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid Crop type",
        });
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Get crop Type
 * @api api/v1/crop-type/:id
 * @access public
 * @type POST
 */
const getSpecificCropType = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const CropTypes = await CropType.findById({ _id: id });

    if (CropTypes) {
      res.status(200).json({
        success: true,
        data: CropTypes,
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
 * @description Get Crop types
 * @api api/v1/crop-type/
 * @access public
 * @type GET
 */
const getCropTypes = asyncHandler(async (req, res) => {
  try {
    const isDeleted = { isDeleted: false };
    const cropTypes = await CropType.find(isDeleted);

    res.status(200).json({
      success: true,
      data: cropTypes,
    });
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Update crop type
 * @api api/v1/crop-type/:id
 * @access private
 * @type PATCH
 */
const updatedCropType = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  try {
    const cropType = await CropType.findById({ _id: id });
    const cropTypeExist = (await cropType.isDeleted) === true;
    if (cropTypeExist) {
      res.status(400);
      throw new Error("Crop type not found");
    } else {
      const updateData = {
        name,
      };

      const updatedCropType = await CropType.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (updatedCropType) {
        res.status(201).json({
          success: true,
          message: "Crop type updated successfully",
          data: updatedCropType,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid Crop type data",
        });
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});

/**
 * @description Delete crop type
 * @api api/v1/crop-type/:id
 * @access private
 * @type PATCH
 */
const deleteCropType = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const isDeleted = {
      isDeleted: true,
    };

    const cropType = await CropType.findById({ _id: id });
    const cropTypeNotExist = (await cropType.isDeleted) === true;
    if (cropTypeNotExist) {
      res.status(400);
      throw new Error("Crop type not found");
    } else {
      const deletedCropType = await CropType.findByIdAndUpdate(id, isDeleted);
      if (deletedCropType) {
        res.status(201).json({
          success: true,
          message: "Crop type deleted successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid crop type data",
        });
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  createCropType,
  getSpecificCropType,
  getCropTypes,
  updatedCropType,
  deleteCropType,
};
