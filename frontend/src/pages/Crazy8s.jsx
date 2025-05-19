import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Button from "../components/Button/Button";
import { createDeck, shuffleDeck } from "../utils/deck";
import styles from "../styles/crazy8sgamepage.module.css";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const GameState = {
  INITIALIZING: "initializing",
  PLAYER_TURN: "playerTurn",
  COMPUTER_TURN: "computerTurn",
  GAME_OVER: "gameOver",
};

export default function Crazy8Game() {
  // Game state
  const [gameState, setGameState] = useState(GameState.INITIALIZING);

  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [drawPile, setDrawPile] = useState([]);
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    handleStateTransition();
  }, [gameState]);

  function startGame() {
    setWinner(null);
    setMessage("Nova igra se je začela");
    setTimeout(() => setMessage(""), 5000);

    const deck = shuffleDeck(createDeck());
    const player = deck.splice(0, 7);
    const computer = deck.splice(0, 7);
    const discard = [deck.shift()];
    const draw = deck;

    setPlayerHand(player);
    setComputerHand(computer);
    setDiscardPile(discard);
    setDrawPile(draw);

    setGameState(GameState.PLAYER_TURN);
  }

  function handleStateTransition() {
    switch (gameState) {
      case GameState.INITIALIZING:
        break;

      case GameState.PLAYER_TURN:
        if (playerHand.length === 0) {
          setWinner("igralec");
          setMessage("Zmagal/a si!");
          setGameState(GameState.GAME_OVER);
        } else if (
          drawPile.length === 0 &&
          !hasPlayableCard(playerHand, discardPile[discardPile.length - 1])
        ) {
          setTimeout(() => {
            setMessage("Ni več možnih potez. Igra je neodločena.");
            setGameState(GameState.GAME_OVER);
          }, 1000);
        }
        break;

      case GameState.COMPUTER_TURN:
        executeComputerTurn();
        break;

      case GameState.GAME_OVER:
        break;

      default:
        console.error("Unknown game state:", gameState);
    }
  }

  function playerPlayCard(card, index) {
    if (gameState !== GameState.PLAYER_TURN) return;

    const topCard = discardPile[discardPile.length - 1];

    if (
      card.suit === topCard.suit ||
      card.rank === topCard.rank ||
      card.rank === "8"
    ) {
      const newHand = [...playerHand];
      newHand.splice(index, 1);
      const newDiscard = [...discardPile, card];

      setPlayerHand(newHand);
      setDiscardPile(newDiscard);

      setGameState(GameState.COMPUTER_TURN);
    }
  }

  function playerDrawCard() {
    if (gameState !== GameState.PLAYER_TURN || drawPile.length === 0) return;

    const newCard = drawPile[0];
    const newDrawPile = drawPile.slice(1);
    const newPlayerHand = [...playerHand, newCard];

    setDrawPile(newDrawPile);
    setPlayerHand(newPlayerHand);

    setMessage(
      `Potegnil/a si ${newCard.rank} ${renderSuitSymbol(newCard.suit)}`
    );
    setTimeout(() => setMessage(""), 1500);

    if (newDrawPile.length === 0) {
      setMessage("Ni več kart za vlečenje!");
      setTimeout(() => {
        setMessage("");
        setGameState(GameState.COMPUTER_TURN);
      }, 1500);
      return;
    }

    const topCard = discardPile[discardPile.length - 1];
    if (
      newCard.suit === topCard.suit ||
      newCard.rank === topCard.rank ||
      newCard.rank === "8"
    ) {
    } else {
      setTimeout(() => {
        setGameState(GameState.COMPUTER_TURN);
      }, 1000);
    }
  }

  function executeComputerTurn() {
    setTimeout(() => {
      if (gameState !== GameState.COMPUTER_TURN) return;

      const topCard = discardPile[discardPile.length - 1];

      const playableIndex = computerHand.findIndex(
        (card) =>
          card.suit === topCard.suit ||
          card.rank === topCard.rank ||
          card.rank === "8"
      );

      if (playableIndex !== -1) {
        const cardToPlay = computerHand[playableIndex];
        const newComputerHand = [...computerHand];
        newComputerHand.splice(playableIndex, 1);

        setComputerHand(newComputerHand);
        setDiscardPile([...discardPile, cardToPlay]);

        if (newComputerHand.length === 0) {
          setWinner("racunalnik");
          setMessage("Računalnik je zmagal");
          setGameState(GameState.GAME_OVER);
          return;
        }
      } else if (drawPile.length > 0) {
        const newCard = drawPile[0];
        setDrawPile(drawPile.slice(1));
        setComputerHand([...computerHand, newCard]);
      }

      setGameState(GameState.PLAYER_TURN);
    }, 500);
  }

  function hasPlayableCard(hand, topCard) {
    if (!hand || !topCard || hand.length === 0) return false;
    return hand.some(
      (card) =>
        card.suit === topCard.suit ||
        card.rank === topCard.rank ||
        card.rank === "8"
    );
  }

  const renderSuitSymbol = (suit) => {
    switch (suit) {
      case "hearts":
        return "♥";
      case "diamonds":
        return "♦";
      case "spades":
        return "♠";
      case "clubs":
        return "♣";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className={styles.breadcrumbs}>
        <Link to="/games" className={styles.breadcrumbLink}>
          <ChevronLeft className={styles.breadcrumbIcon} />
          Nazaj na igre
        </Link>
      </div>
      <div className={styles.gameContainer}>
        <h2 className={styles.gameTitle}>Crazy 8's</h2>
        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.gameState}>
          Current State:{" "}
          {gameState === GameState.PLAYER_TURN
            ? "Your Turn"
            : gameState === GameState.COMPUTER_TURN
            ? "Computer's Turn"
            : gameState === GameState.GAME_OVER
            ? "Game Over"
            : "Setting Up"}
        </div>

        <div className={styles.gameBoard}>
          {gameState === GameState.GAME_OVER && (
            <div className={styles.winnerMessage}>
              {winner === "igralec" ? "Zmagal/a si!" : "Računalnik je zmagal!"}
              <br />
              <Button className={styles.newGameButton} onClick={startGame}>
                Nova igra
              </Button>
            </div>
          )}

          {/* Computer Hand */}
          <div className={styles.computerSection}>
            <h5 className={styles.sectionTitle}>
              Computer: {computerHand.length} cards
            </h5>
            <div className={styles.computerHand}>
              {computerHand.map((_, idx) => (
                <div key={idx} className={styles.cardBack}></div>
              ))}
            </div>
          </div>

          {/* Discard Pile */}
          <div className={styles.discardSection}>
            <h5 className={styles.sectionTitle}>Discard Pile:</h5>
            {discardPile.length > 0 && (
              <div
                className={`${styles.card} ${
                  discardPile[discardPile.length - 1].suit === "hearts" ||
                  discardPile[discardPile.length - 1].suit === "diamonds"
                    ? styles.redCard
                    : styles.blackCard
                }`}
              >
                {discardPile[discardPile.length - 1].rank}{" "}
                {renderSuitSymbol(discardPile[discardPile.length - 1].suit)}
              </div>
            )}
          </div>

          {/* Player Hand */}
          <div className={styles.playerSection}>
            <h5 className={styles.sectionTitle}>Your Hand:</h5>
            <div className={styles.playerHand}>
              {playerHand.map((card, index) => (
                <motion.div
                  key={index}
                  className={`${styles.card} ${
                    card.suit === "hearts" || card.suit === "diamonds"
                      ? styles.redCard
                      : styles.blackCard
                  }`}
                  onClick={() => playerPlayCard(card, index)}
                  style={{
                    cursor:
                      gameState === GameState.PLAYER_TURN
                        ? "pointer"
                        : "default",
                    opacity: gameState === GameState.PLAYER_TURN ? 1 : 0.7,
                  }}
                  whileTap={{
                    scale: gameState === GameState.PLAYER_TURN ? 0.9 : 1,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {card.rank} {renderSuitSymbol(card.suit)}
                </motion.div>
              ))}
            </div>
          </div>

          <div className={styles.drawCardSection}>
            {gameState === GameState.PLAYER_TURN && drawPile.length > 0 && (
              <Button className={styles.drawButton} onClick={playerDrawCard}>
                Potegni karto
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
