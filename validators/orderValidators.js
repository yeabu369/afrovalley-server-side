const { body, query, params } = require("express-validator");

/**@list_of_attributes for validation */
// const awolContract = body("image")
//   .isString()
//   .withMessage("Crop type name is required.");
const buyerFirstName = body("buyerFirstName")
  .isString()
  .withMessage("Buyer first name is required.");
const buyerLastName = body("buyerLastName")
  .isString()
  .withMessage("Buyer last name is required.");
const orderType = body("orderType")
  .isBoolean()
  .withMessage("Order type is required.");

const crops = body("crops").isArray().withMessage("Crops are required.");

const totalPrice = body("totalPrice")
  .isNumeric()
  .withMessage("Total price is required.");

/**@order validation */
const cropTypeValidator = [
  buyerFirstName,
  buyerLastName,
  orderType,
  crops,
  totalPrice,
];

module.exports = {
  cropValidator,
};
