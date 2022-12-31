const { body, query, params } = require("express-validator");

/**@list_of_attributes for validation */
const name = body("name").isString().withMessage("Crop type name is required.");

/**@create_crop_type validation */
const cropTypeValidator = [name];

module.exports = {
  cropTypeValidator,
};
