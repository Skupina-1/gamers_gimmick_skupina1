import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import {
  Star,
  ChevronLeft,
  ShoppingCart,
  Heart,
  Share2,
  Calendar,
  Tag,
} from "lucide-react";
import styles from "../styles/gamedetailspage.module.css";
import { toast } from "react-toastify";

export default function GameDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Only fetch data when id is available
    if (id) {
      fetchGameDetails();
    }
  }, [id]);

  const fetchGameDetails = async () => {
    try {
      setLoading(true);
      // Fetch the specific game by ID
      const response = await axios.get(`http://localhost:5000/api/games/${id}`);
      setGame(response.data);
    } catch (err) {
      console.error("Error fetching game details:", err);
      setError("Failed to load game details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  async function handleAddToCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Za dodajanje v košarico se morate prijaviti.");
      navigate("/auth");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/basket/add",
        { games: [game._id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${game.name} je bil dodan v košarico!`);
    } catch (err) {
      toast.error("Napaka pri dodajanju v košarico.");
    }
  }

  const handleAddToWishlist = () => {
    if (!game) return;
    toast.success(`${game.name} je bil dodan na seznam želja!`);
  };

  const handleShare = () => {
    if (!game) return;
    toast.info(`Povezava do ${game.name} je bila kopirana!`);
  };

  // Render star rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className={styles.starIcon} fill="#f59e0b" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className={styles.halfStarContainer}>
          <Star
            className={`${styles.starIcon} ${styles.halfStar}`}
            fill="#f59e0b"
          />
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={styles.starIcon} />);
    }

    return <div className={styles.ratingStars}>{stars}</div>;
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading game details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !game) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error || "Game not found"}</p>
          <Button onClick={() => navigate("/shop")}>Nazaj v trgovino</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumbs}>
          <Link to="/shop" className={styles.breadcrumbLink}>
            <ChevronLeft className={styles.breadcrumbIcon} />
            Nazaj v trgovino
          </Link>
        </div>
        {/* Game Details Section */}
        <div className={styles.gameDetails}>
          {/* Game Image */}
          <div className={styles.gameImageContainer}>
            <img
              src={`http://localhost:5000${game.image}`}
              alt={game.name}
              width={600}
              height={600}
              className={styles.gameImage}
            />
            {!game.availability && (
              <div className={styles.unavailableBadge}>Ni na voljo</div>
            )}
          </div>

          {/* Game Info */}
          <div className={styles.gameInfo}>
            <div className={styles.gameCategory}>{game.category}</div>
            <h1 className={styles.gameTitle}>{game.name}</h1>

            <div className={styles.gameRating}>
              {renderRating(game.rating)}
              <span className={styles.ratingValue}>
                {game.rating.toFixed(1)}
              </span>
            </div>

            <div className={styles.gamePrice}>
              <span className={styles.priceValue}>{game.price} €</span>
              {game.availability ? (
                <span className={styles.availabilityTag}>Na voljo</span>
              ) : (
                <span className={styles.unavailabilityTag}>
                  Trenutno ni na voljo
                </span>
              )}
            </div>

            <div className={styles.gameMetadata}>
              <div className={styles.metadataItem}>
                <Calendar className={styles.metadataIcon} />
                <span>Starost: {game.ageGroup}</span>
              </div>
              <div className={styles.metadataItem}>
                <Tag className={styles.metadataIcon} />
                <span>Kategorija: {game.category}</span>
              </div>
            </div>

            <div className={styles.gameDescription}>
              <h3 className={styles.sectionTitle}>Opis</h3>
              <p>{game.description}</p>
            </div>

            {game.availability && (
              <div className={styles.quantitySelector}>
                <span className={styles.quantityLabel}>Količina:</span>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className={styles.gameActions}>
              <Button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={!game.availability}
              >
                <ShoppingCart className={styles.actionIcon} />
                {game.availability
                  ? "Dodaj v košarico"
                  : "Trenutno ni na voljo"}
              </Button>

              <button
                className={styles.wishlistButton}
                onClick={handleAddToWishlist}
              >
                <Heart className={styles.wishlistIcon} />
              </button>

              <button className={styles.shareButton} onClick={handleShare}>
                <Share2 className={styles.shareIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
