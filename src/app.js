const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();
const port = 3000;
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.json({message: "User data saved successfully!"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const users = await User.findOne({emailId: emailId});
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

        if(users.length === 0) {
            res.status(404).json({message: "User record not found!"})
        } else {
            res.json({message: "User data fetched successfully", data: users});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})









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
