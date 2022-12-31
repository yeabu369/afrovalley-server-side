const mongoose = require("mongoose");

const CropSchema = mongoose.Schema(
  {
    imagePath: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    cropYear: {
      type: Date,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    price: {
      type: Number,
      required: true,
    },
    quality: {
      type: Number,
      required: true,
    },
    screenSize: {
      type: Number,
      required: true,
    },
    cupTest: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    moisture: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    processMethod: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    soilType: {
      type: String,
      required: true,
    },
    altitude: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        ref: "Reviews",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Crops", CropSchema);
