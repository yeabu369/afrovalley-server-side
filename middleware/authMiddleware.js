const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const { SECRET } = require("../constants/index");

const Sec = "secret";
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    /**@get_token from headers */
    token = req.headers.authorization.split(" ")[1];

    /**@verify_token */
    const decodedToken = jwt.verify(token, Sec);
    req.userData = decodedToken;
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
});

module.exports = { protect };
