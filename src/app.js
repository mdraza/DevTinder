const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validation");

const app = express();
const port = 3000;
app.use(express.json());

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
