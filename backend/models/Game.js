const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    category: String,
    ageGroup: String,
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
