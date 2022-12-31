const mongoose = require("mongoose");
const ReviewSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Crops",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
mongoose.exports = mongoose.models("Reviews", ReviewSchema);
