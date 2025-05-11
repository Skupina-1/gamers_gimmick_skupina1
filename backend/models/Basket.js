const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game", // Reference to the Game model
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Basket", basketSchema);
