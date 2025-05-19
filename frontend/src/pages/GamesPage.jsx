import Layout from "../components/Layout";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import styles from "../styles/gamespage.module.css";
import tictactoe from "../static/tictactoe.jpg";
import crazy8s from "../static/crazy8s.jpg";

export default function GamesHub() {
  return (
    <Layout>
      <div className={styles.gamesHubContainer}>
        <h2 className={styles.title}>Izberi igro</h2>
        <div className={styles.gamesList}>
          <Link to="/crazy8s" className={styles.gameCard}>
            <img
              src={crazy8s}
              alt="Crazy 8s"
              className={styles.gameImage}
              width={220}
              height={220}
            />
            <h3>Crazy 8s</h3>
            <p>Igraj priljubljeno igro s kartami proti računalniku.</p>
            <Button>Začni Crazy 8s</Button>
          </Link>
          <Link to="/tictactoe" className={styles.gameCard}>
            <img
              src={tictactoe}
              alt="Tic Tac Toe"
              className={styles.gameImage}
              width={220}
              height={220}
            />
            <h3>Tic Tac Toe</h3>
            <p>Klasična igra križcev in krožcev.</p>
            <Button>Začni Tic Tac Toe</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
