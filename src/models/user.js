const mongoose = require("mongoose");
var validator = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      index: true,
      lowercase: true,
      trim: true,
      maxLength: 30,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email ID");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate: (value) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Invalid password, please enter mix of number, uppeercase, lowercase & special char.",
          );
        }
      },
    },
    age: {
      type: Number,
      min: 5,
      max: 50,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: `{VALUE} is invalid gender data`
      }
      // validate: (value) => {
      //   if (!["male", "female"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default: "https://placehold.net/avatar.png",
      validate: (value) => {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL!" + value);
        }
      },
    },
    about: {
      type: String,
      default: "Hi, this is a default about the user",
      trim: true,
      maxLength: 100,
    },
    skills: {
      type: [String],
      validate: (value) => {
        if (value.length > 5) {
          throw new Error("Not allowed more than 3 skills");
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

// userSchema.index({firstName: 1});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Mdraza@123", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function(userEnteredPassword){
    const user = this;
    const passwordHash = user.password

    const comparePassword = await bcrypt.compare(userEnteredPassword, passwordHash);
    return comparePassword;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
