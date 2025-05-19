const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

// Get all transactions for the logged-in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate("games")
      .sort({ borrowedDate: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// Return a game
// PATCH /api/transactions/return/:id
router.patch("/return/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    transaction.status = "returned";
    await transaction.save();
    res.json({ message: "Rental returned", transaction });
  } catch (err) {
    res.status(500).json({ message: "Failed to update transaction" });
  }
});

module.exports = router;
