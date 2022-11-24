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

/**@across_origin_service CORS  */
const corsOptions = {
  origin: "*",
  //access-control-allow-credentials:true else false
  credentials: false,
  optionSuccessStatus: 200,
};

/**@user_route */
app.use("/api/v1/user", cors(corsOptions), require("./routes/userRoute"));

/**@error_handler */
app.use(errorHandler);
app.listen(port, () =>
  console.log(`Server started on port ${port}`.cyan.underline)
);
