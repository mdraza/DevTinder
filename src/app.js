const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
const port = 3000;

app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
    console.log("Sent data");
    res.send("Sent data successfully!")
})

app.get("/user", userAuth, (req, res) => {
    console.log("User data sent")
    res.send("User data sent")
})

app.get("/admin/delete", (req, res) => {
    console.log("Deleted user successfully!");
    res.send("Deleted user successfully!");
})

app.listen(port, () => {
    console.log(`Server running successfully on port ${port}`)
})