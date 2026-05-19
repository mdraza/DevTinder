const express = require("express");

const app = express();
const port = 3000;

app.use("/test", (req, res) => {
    res.send("Hi...Node....123")
})

app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`)
})