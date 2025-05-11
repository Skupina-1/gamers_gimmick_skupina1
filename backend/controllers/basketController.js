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

// PATCH /api/basket/checkout
exports.checkoutBasket = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the token
    let basket = await Basket.findOne({ user: userId });

    if (!basket || basket.games.length === 0) {
      return res.status(400).json({ message: "Basket is empty" });
    }

    // Calculate total price for all the games in the basket
    const games = await Game.find({ _id: { $in: basket.games } });

    const totalPrice = games.reduce((acc, game) => acc + game.price, 0);

    // Assuming the dueDate is set 7 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    // Create the transaction
    const transaction = new Transaction({
      user: userId,
      games: basket.games,
      totalPrice,
      dueDate,
    });

    await transaction.save();

    // Update game availability
    await Game.updateMany(
      { _id: { $in: basket.games } },
      { $set: { availability: false } } // Set available to false to mark as borrowed
    );

    basket.games = [];
    await basket.save();

    res
      .status(200)
      .json({ message: "Checkout complete. Enjoy your games!", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
