const Basket = require("../models/Basket");
const Game = require("../models/Game");
const Transaction = require("../models/Transaction");

// GET /api/basket
exports.getBasket = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the token

    let basket = await Basket.findOne({ user: userId }).populate("games");

    if (!basket) {
      return res.status(404).json({ message: "Basket not found" });
    }

    res.json(basket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/basket/add
exports.addToBasket = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the token
    const { games } = req.body; // Expecting an array of game IDs

    if (!Array.isArray(games) || games.length === 0) {
      return res.status(400).json({ message: "Games array is required" });
    }

    let basket = await Basket.findOne({ user: userId });

    if (!basket) {
      // Create a new basket if not found
      basket = new Basket({
        user: userId, // Add the user to the basket
        games: games,
      });
    } else {
      games.forEach((gameId) => {
        if (!basket.games.includes(gameId)) {
          basket.games.push(gameId); // Only add if not already in the basket
        }
      });
    }

    await basket.save();
    res.status(200).json({ message: "Games added to basket", basket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/basket/remove/:gameId
exports.removeFromBasket = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the token
    const { gameId } = req.params;

    let basket = await Basket.findOne({ user: userId });

    if (!basket) {
      return res.status(404).json({ message: "Basket not found" });
    }

    basket.games = basket.games.filter(
      (id) => id.toString() !== gameId.toString()
    );

    await basket.save();
    res.status(200).json({ message: "Game removed from basket", basket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/basket/checkout
exports.checkoutBasket = async (req, res) => {
  try {
    const basket = await Basket.findOne({ user: req.user._id }).populate(
      "games"
    );
    if (!basket || basket.games.length === 0) {
      return res.status(400).json({ message: "Basket is empty" });
    }

    // Calculate total price
    const totalPrice = basket.games.reduce(
      (sum, game) => sum + (game.price || 0),
      0
    );

    // Set due date (e.g., 14 days from now)
    const borrowedDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowedDate.getDate() + 14);

    // Create transaction
    const transaction = new Transaction({
      user: req.user._id,
      games: basket.games.map((game) => game._id),
      totalPrice,
      borrowedDate,
      dueDate,
      status: "active",
    });
    await transaction.save();

    // Clear basket
    basket.games = [];
    await basket.save();

    res.status(201).json({ message: "Checkout successful", transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Checkout failed" });
  }
};
