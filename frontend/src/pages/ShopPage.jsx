import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button/Button";
import { Filter, ChevronDown, Search, Star } from "lucide-react";
import styles from "../styles/shoppage.module.css";
import { toast } from "react-toastify";

export default function ShopPage() {
  const [originalGames, setOriginalGames] = useState([]);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    ageGroup: [],
    availability: null,
  });
  const [sortOption, setSortOption] = useState("name-asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch games from backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games"); // <-- Change this to your actual API URL
        setOriginalGames(response.data);
        setGames(response.data);

        // Extract unique categories and age groups
        const uniqueCategories = [
          ...new Set(response.data.map((game) => game.category)),
        ];
        const uniqueAgeGroups = [
          ...new Set(response.data.map((game) => game.ageGroup)),
        ];

        setCategories(uniqueCategories);
        setAgeGroups(uniqueAgeGroups);
      } catch (err) {
        setError("Failed to fetch games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filteredGames = [...originalGames];

    // Apply search
    if (searchTerm) {
      filteredGames = filteredGames.filter(
        (game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (game.description &&
            game.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filteredGames = filteredGames.filter((game) =>
        filters.category.includes(game.category)
      );
    }

    // Apply age group filter
    if (filters.ageGroup.length > 0) {
      filteredGames = filteredGames.filter((game) =>
        filters.ageGroup.includes(game.ageGroup)
      );
    }

    // Apply availability filter
    if (filters.availability !== null) {
      filteredGames = filteredGames.filter(
        (game) => game.availability === filters.availability
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "name-asc":
        filteredGames.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredGames.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filteredGames.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredGames.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        filteredGames.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setGames(filteredGames);
  }, [filters, sortOption, searchTerm, originalGames]);

  // Toggle filter selection
  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (type === "availability") {
        // Toggle between true, false, and null for availability
        newFilters.availability =
          newFilters.availability === value ? null : value;
      } else {
        // For arrays (category, ageGroup)
        if (newFilters[type].includes(value)) {
          newFilters[type] = newFilters[type].filter((item) => item !== value);
        } else {
          newFilters[type] = [...newFilters[type], value];
        }
      }
      return newFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      ageGroup: [],
      availability: null,
    });
    setSearchTerm("");
    setSortOption("name-asc");
  };

  // Add to cart function
  async function addToCart(game) {
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

  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <section className={styles.shopHeader}>
            <div className={styles.shopHeaderContent}>
              <h1 className={styles.shopTitle}>Zbirka družabnih iger</h1>
              <p className={styles.shopDescription}>
                Oglejte si našo bogato zbirko družabnih iger, ki so na voljo za
                najem. Filtrirajte po kategoriji, starostni skupini ali
                razpoložljivosti in poiščite popolnega spremljevalca zabavnega
                večera.
              </p>
            </div>
          </section>

          <section className={styles.shopContent}>
            <div className={styles.shopControls}>
              <div className={styles.searchBar}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Prebrskaj igre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                {searchTerm && (
                  <button
                    className={styles.clearSearch}
                    onClick={() => setSearchTerm("")}
                  >
                    ×
                  </button>
                )}
              </div>

              <div className={styles.sortContainer}>
                <label htmlFor="sort" className={styles.sortLabel}>
                  Razvrsti po:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="name-asc">Ime (A-Z)</option>
                  <option value="name-desc">Ime (Z-A)</option>
                  <option value="price-asc">Cena (Najnižja-Najvišja)</option>
                  <option value="price-desc">Cena (Najvišja-Najnižja)</option>
                  <option value="rating-desc">Ocena (Najvišja-Najnižja)</option>
                </select>
              </div>

              <button
                className={styles.filterToggle}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className={styles.filterIcon} />
                <span>Filtri</span>
                <ChevronDown
                  className={`${styles.chevron} ${
                    showFilters ? styles.chevronUp : ""
                  }`}
                />
              </button>
            </div>

            <div
              className={`${styles.filtersContainer} ${
                showFilters ? styles.showFilters : ""
              }`}
            >
              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Kategorije</h3>
                <div className={styles.filterOptions}>
                  {categories.map((cat) => (
                    <label key={cat} className={styles.filterOption}>
                      <input
                        type="checkbox"
                        checked={filters.category.includes(cat)}
                        onChange={() => toggleFilter("category", cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Starostna skupina</h3>
                <div className={styles.filterOptions}>
                  {ageGroups.map((age) => (
                    <label key={age} className={styles.filterOption}>
                      <input
                        type="checkbox"
                        checked={filters.ageGroup.includes(age)}
                        onChange={() => toggleFilter("ageGroup", age)}
                      />
                      <span>{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Razpoložljivost</h3>
                <div className={styles.filterOptions}>
                  <label className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={filters.availability === true}
                      onChange={() => toggleFilter("availability", true)}
                    />
                    <span>Na voljo</span>
                  </label>
                  <label className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={filters.availability === false}
                      onChange={() => toggleFilter("availability", false)}
                    />
                    <span>Ni na voljo</span>
                  </label>
                </div>
              </div>

              <button
                className={styles.clearFiltersButton}
                onClick={clearFilters}
              >
                Počisti filtre
              </button>
            </div>

            {/* Main Games Grid */}
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading games...</p>
              </div>
            ) : error ? (
              <div className={styles.errorContainer}>
                <p className={styles.error}>{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : games.length === 0 ? (
              <div className={styles.noResults}>
                <h3>No games found</h3>
                <p>Try adjusting your filters or search term</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={styles.gamesGrid}>
                {games.map((game, index) => (
                  <div key={index} className={styles.gameCard}>
                    <div className={styles.gameImageContainer}>
                      <Link to={`/games/${game._id}`}>
                        <img
                          src={`http://localhost:5000${game.image}`}
                          alt={game.name}
                          width={300}
                          height={300}
                          className={styles.gameImage}
                        />
                      </Link>
                      <div className={styles.gameCategory}>{game.category}</div>
                      {!game.availability && (
                        <div className={styles.unavailableBadge}>
                          Ni na voljo
                        </div>
                      )}
                    </div>
                    <div className={styles.gameInfo}>
                      <h3 className={styles.gameName}>{game.name}</h3>
                      <div className={styles.gameDetails}>
                        <div className={styles.gameRating}>
                          {renderRating(game.rating)}
                          <span className={styles.ratingValue}>
                            {game.rating.toFixed(1)}
                          </span>
                        </div>
                        <div className={styles.gamePrice}>{game.price} €</div>
                        <div className={styles.gameAge}>
                          Starost: {game.ageGroup}
                        </div>
                      </div>
                      <p className={styles.gameDescription}>
                        {game.description}
                      </p>
                      <Button
                        className={styles.addToCartButton}
                        onClick={() => addToCart(game)}
                        disabled={!game.availability}
                      >
                        {game.availability
                          ? "Dodaj v košarico"
                          : "Trenutno ni na voljo"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </Layout>
  );
}
