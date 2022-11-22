const mongoose = require("mongoose");
const { compare, hash } = require("bcryptjs");
const { SECRET } = require("../constants/index");
const { sign } = require("jsonwebtoken");

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Employee",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

EmployeeSchema.pre("save", async (next) => {
  let employee = this;
  if (!employee.isModified("password")) return next();
  employee.password = await hash(employee.password, 10);
  next();
});

EmployeeSchema.methods.comparePassword = async (password) => {
  return await compare(password, this.password);
};

EmployeeSchema.methods.generateJWT = async () => {
  let payload = {
    email: this.email,
    name: this.name,
    id: this._id,
  };
  return await sign(payload, SECRET, { expiresIn: "1 day" });
};
module.exports = mongoose.model("Employee", EmployeeSchema);
