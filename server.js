const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { APP_PORT } = require("./constants/index");
const { connectDB } = require("./config/db.config");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = APP_PORT;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public/uploads"));
// { limit: "2gb" }

/**@across_origin_service CORS  */
const corsOptions = {
  origin: "*",
  credentials: false, //access-control-allow-credentials:true else false
  optionSuccessStatus: 200,
};

/**@all_routs */
app.use("/api/v1/users", cors(corsOptions), require("./routes/userRoute"));
app.use(
  "/api/v1/crop-type",
  cors(corsOptions),
  require("./routes/cropTypeRoute")
);
app.use("/api/v1/crops", cors(corsOptions), require("./routes/cropRoute"));

/**@error_handler */
app.use(errorHandler);

//Installing nodemon as a dependency is not the write way cause it is a dev dependency
//but i install it as a dependency to track changes on my heroku server
app.listen(port, () =>
  console.log(`Server started on port ${port}`.cyan.underline)
);
