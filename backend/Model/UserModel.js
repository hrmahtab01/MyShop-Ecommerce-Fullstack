const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      require: true,
      type: String,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      require: true,
      min: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
