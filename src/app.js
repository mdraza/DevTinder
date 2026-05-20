const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();
const port = 3000;
app.use(express.json())


app.post("/signup", async (req, res) => {
    console.log(req.body);
    const user = new User(req.body)

    try {
        await user.save();
        res.send("User data saved successfully!")
    } catch (error) {
        res.status(400).json({message: error.message})
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
