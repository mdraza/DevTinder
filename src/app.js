const express = require("express");

const app = express();
const port = 3000;



app.get("/user", (req, res) => {
    console.log(req.query);
    const userData = req.query;
    res.send(userData);
})

app.get("/users/:userid/:name/:city", (req, res) => {
    console.log(req.params);
    res.send(req.params);
})

app.post("/user", (req, res) => {
    res.send("Data saved successfully!")
})

app.delete("/user", (req, res) => {
    res.send("User deleted successfully!")
})

app.use("/user", (req, res) => {
    res.send("use http request")
})

app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`)
})