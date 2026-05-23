const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        console.log("Sending connection request...");
        const user = req.user;

        res.send(`${user.firstName} ${user.lastName}, sent the connection request`)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


module.exports = {
    requestRouter,
}