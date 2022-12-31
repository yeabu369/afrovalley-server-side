const { body, query, params } = require("express-validator");

/**@list_of_attributes for validation */

const comment = body("comment").isString().withMessage("Comment is required.");
const date = body("date")
  .custom((date) => new Date(Date.parse(date)))
  .withMessage("Date required.");
const rating = body("rating").isNumeric().withMessage("Rating is required.");

/**@create_crop_type validation */
const reviewValidator = [comment, date, date, rating];

module.exports = {
  reviewValidator,
};
