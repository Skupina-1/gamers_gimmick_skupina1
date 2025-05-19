import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button/Button";
import styles from "../styles/tictactoegame.module.css";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const WIN_LINES = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // cols
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diags
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (let i = 0; i < WIN_LINES.length; i++) {
    const [a, b, c] = WIN_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: WIN_LINES[i], lineIndex: i };
    }
  }
  return null;
}

function getEmptySquares(squares) {
  return squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((v) => v !== null);
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // X = player, O = computer
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line;
  const winningLineIndex = result?.lineIndex;
  const isDraw = !winner && squares.every(Boolean);

  // Computer move effect
  useEffect(() => {
    if (!xIsNext && !winner && !isDraw) {
      setIsComputerThinking(true);
      const timeout = setTimeout(() => {
        const empty = getEmptySquares(squares);
        if (empty.length > 0) {
          // Simple AI: random move
          const move = empty[Math.floor(Math.random() * empty.length)];
          const nextSquares = squares.slice();
          nextSquares[move] = "O";
          setSquares(nextSquares);
          setXIsNext(true);
        }
        setIsComputerThinking(false);
      }, 600); // 0.6s delay for realism
      return () => clearTimeout(timeout);
    }
  }, [xIsNext, squares, winner, isDraw]);

  function handleClick(i) {
    if (squares[i] || winner || isComputerThinking || !xIsNext) return;
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
    setXIsNext(false);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // SVG line positions for each win line
  const lineCoords = [
    // Horizontal lines
    { x1: 10, y1: 40, x2: 230, y2: 40 },
    { x1: 10, y1: 120, x2: 230, y2: 120 },
    { x1: 10, y1: 200, x2: 230, y2: 200 },
    // Vertical lines
    { x1: 40, y1: 10, x2: 40, y2: 230 },
    { x1: 120, y1: 10, x2: 120, y2: 230 },
    { x1: 200, y1: 10, x2: 200, y2: 230 },
    // Diagonals
    { x1: 20, y1: 20, x2: 220, y2: 220 },
    { x1: 220, y1: 20, x2: 20, y2: 220 },
  ];

  return (
    <Layout>
      <div className={styles.breadcrumbs}>
        <Link to="/games" className={styles.breadcrumbLink}>
          <ChevronLeft className={styles.breadcrumbIcon} />
          Nazaj na igre
        </Link>
      </div>
      <div className={styles.ticTacToeContainer}>
        <h2 className={styles.title}>Tic Tac Toe</h2>
        <div className={styles.status}>
          {winner
            ? `Zmagovalec: ${winner === "X" ? "Ti" : "Računalnik"}`
            : isDraw
            ? "Neodločeno!"
            : xIsNext
            ? "Tvoja poteza (X)"
            : "Računalnik razmišlja..."}
        </div>
        <div className={styles.boardWrapper}>
          <div className={styles.board}>
            {squares.map((square, i) => (
              <button
                key={i}
                className={`${styles.square} ${
                  winningLine && winningLine.includes(i)
                    ? styles.winningSquare
                    : ""
                }`}
                onClick={() => handleClick(i)}
                disabled={
                  !!squares[i] || !!winner || isComputerThinking || !xIsNext
                }
              >
                {square}
              </button>
            ))}
            {/* SVG overlay for winning line */}
            {winner && winningLineIndex !== undefined && (
              <svg
                className={styles.winLine}
                viewBox="0 0 240 240"
                width="240"
                height="240"
              >
                <line
                  x1={lineCoords[winningLineIndex].x1}
                  y1={lineCoords[winningLineIndex].y1}
                  x2={lineCoords[winningLineIndex].x2}
                  y2={lineCoords[winningLineIndex].y2}
                  stroke="#1e90ff"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>
        {(winner || isDraw) && (
          <Button className={styles.restartButton} onClick={handleRestart}>
            Nova igra
          </Button>
        )}
      </div>
    </Layout>
  );
}
