const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { PORT } = require("./constants/index");
const { connectDB } = require("./config/db.config");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = PORT || 5000;

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

/**@employee_route */
app.use(
  "/api/v1/employees",
  cors(corsOptions),
  require("./routes/employeeRoute")
);

/**@error_handler */
app.use(errorHandler);
app.listen(port, () =>
  console.log(`Server started on port ${port}`.cyan.underline)
);