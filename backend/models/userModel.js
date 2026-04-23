const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    //   index: true,
      trim: true,
    },
    userSig: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: false },
);

userSchema.index({ userId: 1 });

const user = mongoose.model("User", userSchema);

module.exports = user;

