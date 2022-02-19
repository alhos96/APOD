const { Admin } = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");

exports.loginAdmin = async (req, res, next) => {
  const { name, password } = req.body;

  // check if admin with entered name exists

  let admin = await Admin.findOne({ name });

  if (!admin) {
    let error = new Error("Wrong username!");

    res.status(400).json("Wrong username!");

    return next(error);
  }

  // check if provided password is correct

  let isPasswordCorrect = await bcrypt.compare(password, admin.password);

  if (!isPasswordCorrect) {
    let error = new Error("Wrong password!");

    res.status(400).json("Wrong password!");

    return next(error);
  }

  // send token

  let token = jwt.sign(admin.name, config.secret);

  res.status(201).json(token);

  console.log(`admin logged in as ${name}`);
};

exports.registerAdmin = async (req, res, next) => {
  const { name, password } = req.body;

  // for postman mock creation only

  let hashedPassword = await bcrypt.hash(password, 2);

  let admin = await Admin.create({
    name,
    password: hashedPassword,
  });

  res.status(200).json(admin);
};
