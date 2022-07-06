//Module Imports
const express = require("express");
const router = express.router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.post(
  "/",
  [
    body("name", "Name should be at least 3 chacater long").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be at least 6 character long").isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    //Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Creating a user
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then((user) => {
      res.json(user);
    });
  }
);

module.exports = router;
