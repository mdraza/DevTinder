const express = require("express");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validate the data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypted hash password
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword,
    });

    await user.save();
    res.json({ message: "User data saved successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    console.log(user);

    if (!user) {
      throw new Error(
        "Invalid credential, please enter correct emailId or password!",
      );
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 9000000),
      });
      res.send("LoggedIn successfully!");
    } else {
      throw new Error(
        "Invalid credential, please enter correct emailId or password!",
      );
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post("/logout", userAuth, (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send(`${req.user.firstName} logout successfully!`);
});

module.exports = {
  authRouter,
};
