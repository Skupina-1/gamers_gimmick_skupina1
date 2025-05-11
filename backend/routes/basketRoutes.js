const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Import the auth middleware
const {
  getBasket,
  addToBasket,
  removeFromBasket,
  checkoutBasket,
} = require("../controllers/basketController");

// Protect the basket routes with authentication middleware
router.get("/", authMiddleware, getBasket); // Only authenticated users can get the basket
router.post("/add", authMiddleware, addToBasket); // Only authenticated users can add to the basket
router.delete("/remove/:gameId", authMiddleware, removeFromBasket); // Only authenticated users can remove from the basket
router.patch("/checkout", authMiddleware, checkoutBasket); // Only authenticated users can checkout

module.exports = router;
