const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({message: "Profile data fetched successfully!", data: user});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = {
    profileRouter,
}