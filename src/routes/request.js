const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const ALLOWED_STATUS = ["interested", "ignored"];

      // Validate status type
      const validRequestStatus = ALLOWED_STATUS.includes(status);

      if (!validRequestStatus) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      // Validate if user send connection request to him self
      if (fromUserId.toString() === toUserId) {
        return res
          .status(400)
          .json({ message: "You can't send connection request to your self!" });
      }

      // Validate the toUserId
      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Validate if the toUserId is present in Db or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}
        ]
      })
      
      if(existingConnectionRequest){
       return res.status(400).json({message: "Connection request is already exists!"})
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const connectionData = await connectionRequest.save();

      res.json({
        message: `${req.user.firstName} ${req.user.lastName}, ${status === "interested" ? "sent the connection request to" : `${status}`} ${toUser.firstName} ${toUser.lastName}`,
        data: connectionData,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

module.exports = {
  requestRouter,
};
