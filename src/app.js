const express = require("express");

const app = express();
const port = 3000;

// app.use("/route", rH1, [rH2, rH3, rH4], rH5);

app.use("/user", [(req, res, next) => {
    console.log("Route-1")
    // res.send("use http request")
    next()
}, (req, res, next) => {
    console.log("Route-2");
    next();
}], (req, res, next) => {
    console.log("Route-3");
    next();
}, (req, res, next) => {
    console.log("Route-4");
    res.send("Route handler-4")
    next();
})

app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`)
})