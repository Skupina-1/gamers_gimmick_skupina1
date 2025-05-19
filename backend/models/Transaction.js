const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    borrowedDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", transactionSchema);
