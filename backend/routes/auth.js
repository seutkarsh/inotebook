//Module Imports
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//Jsonwebtoken Secret
const jwt_secret = "Thisisasecretstring";

//ROUTE 1:Creating user on path /api/auth/createuser . No login Required.
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
    success = false;
    //Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      //Check whether the user with this email already exists in database.
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ success, error: "A user with this email already exists." });
      }

      //Hashing Password
      const salt = await bcrypt.genSalt(10);
      secPassword = await bcrypt.hash(req.body.password, salt);
      //Creating a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      //Generating AuthToken
      data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

//Route 2: Authenticating a user on path /api/auth/login . No login Required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    //Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      //checking if user exists
      if (!user) {
        res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      //comparing passwords
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      //Generating AuthToken
      data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

//Route 3: Getting user data on path /api/auth/getuser .
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured.");
  }
});
module.exports = router;
