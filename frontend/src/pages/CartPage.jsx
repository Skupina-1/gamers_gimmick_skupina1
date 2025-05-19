import { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
} from "lucide-react";
import styles from "../styles/cartpage.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch basket from backend
  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          return;
        }
        const { data } = await axios.get("http://localhost:5000/api/basket", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setItems(
          data.games.map((game) => ({
            ...game,
            quantity: 1,
          }))
        );
      } catch (err) {
        alert("Napaka pri pridobivanju košarice.");
      } finally {
        setLoading(false);
      }
    };
    fetchBasket();
  }, [navigate]);

  // Remove item from basket
  const removeItem = async (gameId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/basket/remove/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== gameId));
    } catch (err) {
      alert("Napaka pri odstranjevanju igre iz košarice.");
    }
  };

  // Calculate cart totals
  const subtotal = items.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal >= 35 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/basket/checkout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Nakup uspešen!");
      navigate("/profile");
    } catch (err) {
      toast.error("Napaka pri zaključku nakupa.");
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.cartContainer}>
          <h1 className={styles.cartTitle}>Košarica</h1>
          {loading ? (
            <div>Loading...</div>
          ) : items.length > 0 ? (
            <div className={styles.cartContent}>
              <div className={styles.cartItems}>
                <div className={styles.cartHeader}>
                  <div className={styles.productCol}>Izdelek</div>
                  <div className={styles.priceCol}>Cena</div>
                  <div className={styles.quantityCol}>Količina</div>
                  <div className={styles.totalCol}>Skupaj</div>
                </div>
                {items.map((item) => (
                  <div key={item._id} className={styles.cartItem}>
                    <div className={styles.productCol}>
                      <div className={styles.productInfo}>
                        <div className={styles.productImage}>
                          <img
                            src={`http://localhost:5000${item.image}`}
                            width={80}
                            height={80}
                            alt={item.name}
                          />
                        </div>
                        <div className={styles.productDetails}>
                          <h3 className={styles.productName}>{item.name}</h3>
                          <button
                            className={styles.removeButton}
                            onClick={() => removeItem(item._id)}
                          >
                            <Trash2 className={styles.removeIcon} />
                            <span>Odstrani</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.priceCol}>
                      <span className={styles.price}>
                        €{item.price?.toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.quantityCol}>
                      <span className={styles.quantityValue}>
                        {item.quantity || 1}
                      </span>
                    </div>
                    <div className={styles.totalCol}>
                      <span className={styles.totalPrice}>
                        €{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
                <div className={styles.cartActions}>
                  <Link to="/shop" className={styles.continueShoppingLink}>
                    <ChevronLeft className={styles.continueIcon} />
                    <span>Nadaljuj z nakupom</span>
                  </Link>
                </div>
              </div>
              <div className={styles.cartSummary}>
                <h2 className={styles.summaryTitle}>Povzetek naročila</h2>
                <div className={styles.summaryContent}>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Skupaj</span>
                    <span className={styles.summaryValue}>
                      €{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Dostava</span>
                    <span className={styles.summaryValue}>
                      {shipping === 0
                        ? "Brezplačno"
                        : `€${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>DDV</span>
                    <span className={styles.summaryValue}>
                      €{tax.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className={`${styles.summaryRow} ${styles.summaryTotal}`}
                  >
                    <span className={styles.summaryLabel}>Skupaj košarica</span>
                    <span className={styles.summaryValue}>
                      €{total.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className={styles.checkoutButton}
                    onClick={handleCheckout}
                  >
                    <span>Zaključi naročilo</span>
                    <ArrowRight className={styles.checkoutIcon} />
                  </Button>
                  <div className={styles.secureCheckout}>
                    <div className={styles.secureItem}>
                      <CreditCard className={styles.secureIcon} />
                      <span>Varno plačilo</span>
                    </div>
                    <div className={styles.secureItem}>
                      <Truck className={styles.secureIcon} />
                      <span>Hitra dostava</span>
                    </div>
                    <div className={styles.secureItem}>
                      <ShieldCheck className={styles.secureIcon} />
                      <span>Zadovoljstvo zagotovljeno</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyCart}>
              <ShoppingCart className={styles.emptyIcon} />
              <h2 className={styles.emptyTitle}>Košarica je prazna</h2>
              <p className={styles.emptyText}>
                V košarico še niste dodali nobenih iger.
              </p>
              <Link to="/shop">
                <Button>Prebrskaj igre</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
