const Game = require("../models/Game");

// GET all games
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new game
exports.addGame = async (req, res) => {
  const game = new Game(req.body);
  try {
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a game
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    await game.deleteOne();
    res.json({ message: "Game removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE a game
exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    game.name = req.body.name || game.name;
    game.description = req.body.description || game.description;
    game.image = req.body.image || game.image;
    game.price = req.body.price || game.price;
    game.availability = req.body.availability ?? game.availability;
    game.category = req.body.category || game.category;
    game.ageGroup = req.body.ageGroup || game.ageGroup;
    game.rating = req.body.rating || game.rating;

    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
