const { body, query, params } = require("express-validator");

/**@list_of_attributes for validation */
// const image = body("image")
//   .isString()
//   .withMessage("Crop type name is required.");

const name = body("name").isString().withMessage("Crop name is required.");

const source = body("source")
  .isString()
  .withMessage("Crop source is required.");

const quality = body("quality")
  .isString()
  .withMessage("Crop quality is required.");

const screenSize = body("screenSize")
  .isString()
  .withMessage("Crop screen size is required.");

const cupTest = body("cupTest")
  .isString()
  .withMessage("Crop cup test is required.");

const grade = body("grade").isNumeric().withMessage("Crop grade is required.");

const quantity = body("quantity")
  .isNumeric()
  .withMessage("Crop quantity is required.");

const processMethod = body("processMethod")
  .isString()
  .withMessage("Crop process method is required.");

const discount = body("discount")
  .isNumeric()
  .withMessage("Crop discount is required.");

const deliveryPrice = body("deliveryPrice")
  .isNumeric()
  .withMessage("Crop delivery price is required.");

const origin = body("origin")
  .isString()
  .withMessage("Crop origin is required.");

const region = body("region")
  .isString()
  .withMessage("Crop region is required.");

const soilType = body("soilType")
  .isString()
  .withMessage("Crop soil type is required.");

const altitude = body("altitude")
  .isString()
  .withMessage("Crop altitude is required.");
const price = body("price").isNumeric().withMessage("Crop price is required.");
const moisture = body("moisture")
  .isNumeric()
  .withMessage("Crop moisture is required.");
const cropYear = body("cropYear")
  .custom((date) => new Date(Date.parse(date)))
  .withMessage("Date required.");

/**@create_crop validation */
const cropValidator = [
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
];

module.exports = {
  cropValidator,
};
