const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { fullname, email, password } = req.body;
  // Hash password
  const hashedPassword = await userModel.hashPassword(password);
  // Create user
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });
  // Generate token
  const token = user.generateAuthToken();
  // Send response
  res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or Password" });
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or Password" });
  }
  const token = user.generateAuthToken();
  res.status(200).json({ token, user });
};
