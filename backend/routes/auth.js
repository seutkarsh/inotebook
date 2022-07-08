//Module Imports
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

//Creating user on path /api/auth/createuser . No login Required.
router.post(
  "/createuser",
  [
    body("name", "Name should be at least 3 chacater long").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be at least 6 character long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Check whether the user with this email already exists in database.
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "A user with this email already exists." });
      }

      //Creating a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

module.exports = router;
