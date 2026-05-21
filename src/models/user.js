const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 20
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 5,
      max: 50
    },
    gender: {
      type: String,
      validate: (value) => {
        if (!["male", "female"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://placehold.net/avatar.png",
    },
    about: {
      type: String,
      default: "Hi, this is a default about the user",
      trim: true,
      maxLength: 100
    },
    skills: {
      type: [String],
      validate: (value) => {
        if(value.length > 5){
            throw new Error("Not allowed more than 3 skills")
        }
      }
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
