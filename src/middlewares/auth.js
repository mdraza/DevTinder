const User = require("../models/user");
var jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  console.log("User authorize checked");
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Please login!");
    }

    const validateUser = jwt.verify(token, "Mdraza@123");

    const { _id } = validateUser;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("Invalid user, please login!");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {
  userAuth,
};
