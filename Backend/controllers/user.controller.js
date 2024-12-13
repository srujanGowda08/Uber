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
