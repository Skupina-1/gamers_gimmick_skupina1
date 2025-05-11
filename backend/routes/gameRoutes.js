const express = require("express");
const router = express.Router();
const {
  getGames,
  addGame,
  deleteGame,
  updateGame,
} = require("../controllers/gameController");

//GET /api/games
router.get("/", getGames);

//POST /api/games/add
router.post("/add", addGame);

//DELETE /api/games/:id
router.delete("/:id", deleteGame);

//UPDATE /api/games/:id
router.patch("/:id", updateGame);

module.exports = router;
