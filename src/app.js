const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



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
