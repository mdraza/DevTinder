const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.index({fromUserId:1, toUserId: 1});

connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    // Check if the fromUserId is same to toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You can't send the connection request to yourself!")
    }
})

const ConnectionRequest = new mongoose.model(
  "ConnectioRequest",
  connectionRequestSchema,
);

module.exports = { ConnectionRequest };
