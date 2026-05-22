const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    console.log(user);

    if (!user) {
      throw new Error(
        "Invalid credential, please enter correct emailId or password!",
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "Mdraza@123");
      console.log(token);

      res.cookie("token", token);
      res.send("Logined successfully");
    } else {
      throw new Error(
        "Invalid credential, please enter correct emailId or password!",
      );
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;

    if(!token){
        throw new Error("Please login!")
    }

    const validateUser = jwt.verify(token, "Mdraza@123");

    const {_id} = validateUser;
    const user = await User.findById(_id);

    if(!user){
        throw new Error("Invalid user, please login!")
    }

    res.json({message: "Profile data fetched successfully!", data: user});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const id = req.body._id;
    const users = await User.findById(id);
    // const users = await User.findOne({emailId: emailId});
    // const users = await User.find({ emailId });

    if (users.length === 0) {
      res.status(404).send("User not found!");
    } else {
      res.json({ message: "User data fetched successfully", data: users });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      res.status(404).json({ message: "User record not found!" });
    } else {
      res.json({ message: "User data fetched successfully", data: users });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/user", async (req, res) => {
  try {
    const id = req.body._id;
    await User.findByIdAndDelete({ _id: id });

    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch("/user/:userId", async (req, res) => {
  const id = req.params.userId;
  console.log(id);

  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "age",
      "about",
      "skills",
      "gender",
    ];

    const isAllowedUpdate = Object.keys(req.body).every((data) =>
      ALLOWED_UPDATES.includes(data),
    );

    if (!isAllowedUpdate) {
      throw new Error("Update not allowed!");
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "before",
      runValidators: true,
    });

    res.send("User update successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully!");
    app.listen(port, () => {
      console.log(`Server running successfully on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
