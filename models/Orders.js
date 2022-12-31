const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    buyerFirstName: {
      type: String,
      required: true,
    },
    buyerLastName: {
      type: String,
      required: true,
    },
    orderType: {
      type: Boolean,
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    crops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "Crops",
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    awolContract: {
      filename: "file.html",
      chunkSize: NumberInt(23980),
      uploadDate: Date,
      length: NumberInt(312),
    },
    payment: {
      type: Boolean,
      required: false,
    },
    review: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

mongoose.export = mongoose.model("Order", OrderSchema);
