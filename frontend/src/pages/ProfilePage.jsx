import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Package, Clock, Settings, LogOut, Edit } from "lucide-react";
import styles from "../styles/profilepage.module.css";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("rentals");
  const [userData, setUserData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const navigate = useNavigate();

  // Fetch user profile info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          return;
        }
        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserData(data);
      } catch (err) {
        setUserData({});
      }
    };
    fetchProfile();
  }, [navigate]);

  // Fetch all transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoadingTransactions(true);
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/transactions/my",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTransactions(data);
      } catch (err) {
        setTransactions([]);
      } finally {
        setLoadingTransactions(false);
      }
    };
    fetchTransactions();
  }, []);

  // Split transactions
  const currentRentals = transactions.filter((t) => t.status === "active");
  const rentalHistory = transactions.filter((t) => t.status !== "active");

  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.profileContainer}>
            {/* Profile Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.userProfile}>
                <h2 className={styles.userName}>
                  {userData.name || "Uporabnik"}
                </h2>
                <p className={styles.userEmail}>{userData.email}</p>
                <div className={styles.userMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Član od:</span>
                    <span className={styles.metaValue}>
                      {userData.memberSince
                        ? new Date(userData.memberSince).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Trenutni plan:</span>
                    <span className={styles.metaValue}>
                      {userData.currentPlan || "-"}
                    </span>
                  </div>
                </div>
              </div>

              <nav className={styles.profileNav}>
                <button
                  className={`${styles.navItem} ${
                    activeTab === "rentals" ? styles.activeNavItem : ""
                  }`}
                  onClick={() => setActiveTab("rentals")}
                >
                  <Package className={styles.navIcon} />
                  <span>Moje izposoje</span>
                </button>
                <button
                  className={`${styles.navItem} ${
                    activeTab === "history" ? styles.activeNavItem : ""
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  <Clock className={styles.navIcon} />
                  <span>Zgodovina izposoj</span>
                </button>
                <button
                  className={`${styles.navItem} ${
                    activeTab === "settings" ? styles.activeNavItem : ""
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className={styles.navIcon} />
                  <span>Nastavitve</span>
                </button>
              </nav>

              <div className={styles.sidebarFooter}>
                <button
                  className={styles.logoutButton}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/auth");
                  }}
                >
                  <LogOut className={styles.logoutIcon} />
                  <span>Izpis</span>
                </button>
              </div>
            </aside>

            {/* Profile Content */}
            <div className={styles.content}>
              {activeTab === "rentals" && (
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <h1 className={styles.tabTitle}>Moje trenutne izposoje</h1>
                    <Link to="/shop" className={styles.browseLink}>
                      Prebrskaj igre
                    </Link>
                  </div>
                  {loadingTransactions ? (
                    <div>Loading...</div>
                  ) : currentRentals.length > 0 ? (
                    <div className={styles.rentalsList}>
                      {currentRentals.map((transaction) => (
                        <div
                          key={transaction._id}
                          className={styles.rentalCard}
                        >
                          <div className={styles.rentalImage}>
                            <img
                              src={
                                transaction.games[0]?.image
                                  ? transaction.games[0].image.startsWith(
                                      "http"
                                    )
                                    ? transaction.games[0].image
                                    : `http://localhost:5000${
                                        transaction.games[0].image.startsWith(
                                          "/"
                                        )
                                          ? ""
                                          : "/uploads/"
                                      }${transaction.games[0].image}`
                                  : "/placeholder.svg"
                              }
                              width={100}
                              height={100}
                              alt={transaction.games[0]?.name || "Game"}
                            />
                          </div>
                          <div className={styles.rentalInfo}>
                            <h3 className={styles.rentalName}>
                              {transaction.games.map((g) => g.name).join(", ")}
                            </h3>
                            <div className={styles.rentalDetails}>
                              <div className={styles.rentalDetail}>
                                <span className={styles.detailLabel}>
                                  Obdobje izposoje:
                                </span>
                                <span className={styles.detailValue}>
                                  {transaction.borrowedDate
                                    ? new Date(
                                        transaction.borrowedDate
                                      ).toLocaleDateString()
                                    : "-"}{" "}
                                  -{" "}
                                  {transaction.dueDate
                                    ? new Date(
                                        transaction.dueDate
                                      ).toLocaleDateString()
                                    : "-"}
                                </span>
                              </div>
                              <div className={styles.rentalDetail}>
                                <span className={styles.detailLabel}>
                                  Skupna cena:
                                </span>
                                <span className={styles.detailValue}>
                                  €{transaction.totalPrice?.toFixed(2)}
                                </span>
                              </div>
                              <div className={styles.rentalDetail}>
                                <span className={styles.detailLabel}>
                                  Status:
                                </span>
                                <span className={styles.detailValue}>
                                  {transaction.status || "Aktivno"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.rentalActions}>
                            <div
                              className={`${styles.rentalStatus} ${styles.statusActive}`}
                            >
                              {transaction.status || "Active"}
                            </div>
                            <Button
                              className={styles.returnButton}
                              onClick={async () => {
                                try {
                                  const token = localStorage.getItem("token");
                                  await axios.patch(
                                    `http://localhost:5000/api/transactions/return/${transaction._id}`,
                                    {},
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  );
                                  // Refresh transactions after return
                                  const { data } = await axios.get(
                                    "http://localhost:5000/api/transactions/my",
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  );
                                  setTransactions(data);
                                } catch (err) {
                                  alert("Failed to return rental.");
                                }
                              }}
                            >
                              Vrni
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <Package className={styles.emptyIcon} />
                      <h3 className={styles.emptyTitle}>Ni aktivnih izposoj</h3>
                      <p className={styles.emptyText}>
                        Trenutno nimaš nobenih aktivnih izposoj.
                      </p>
                      <Link to="/shop">
                        <Button>Prebrskaj igre</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <h1 className={styles.tabTitle}>Zgodovina izposoj</h1>
                  </div>
                  {loadingTransactions ? (
                    <div>Loading...</div>
                  ) : rentalHistory.length > 0 ? (
                    <div className={styles.rentalsList}>
                      {rentalHistory.map((transaction) => (
                        <div
                          key={transaction._id}
                          className={styles.rentalCard}
                        >
                          <div className={styles.rentalImage}>
                            <img
                              src={
                                transaction.games[0]?.image
                                  ? transaction.games[0].image.startsWith(
                                      "http"
                                    )
                                    ? transaction.games[0].image
                                    : `http://localhost:5000${
                                        transaction.games[0].image.startsWith(
                                          "/"
                                        )
                                          ? ""
                                          : "/uploads/"
                                      }${transaction.games[0].image}`
                                  : "/placeholder.svg"
                              }
                              width={100}
                              height={100}
                              alt={transaction.games[0]?.name || "Game"}
                            />
                          </div>
                          <div className={styles.rentalInfo}>
                            <h3 className={styles.rentalName}>
                              {transaction.games.map((g) => g.name).join(", ")}
                            </h3>
                            <div className={styles.rentalDetails}>
                              <div className={styles.rentalDetail}>
                                <span className={styles.detailLabel}>
                                  Obdobje izposoje:
                                </span>
                                <span className={styles.detailValue}>
                                  {transaction.borrowedDate
                                    ? new Date(
                                        transaction.borrowedDate
                                      ).toLocaleDateString()
                                    : "-"}{" "}
                                  -{" "}
                                  {transaction.dueDate
                                    ? new Date(
                                        transaction.dueDate
                                      ).toLocaleDateString()
                                    : "-"}
                                </span>
                              </div>
                              <div className={styles.rentalDetail}>
                                <span className={styles.detailLabel}>
                                  Skupna cena:
                                </span>
                                <span className={styles.detailValue}>
                                  €{transaction.totalPrice?.toFixed(2)}
                                </span>
                              </div>
                              <div className={styles.rentalDetail}>
                                <span className={styles.detailLabel}>
                                  Status:
                                </span>
                                <span className={styles.detailValue}>
                                  {transaction.status || "Vrnjeno"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.rentalActions}>
                            <div
                              className={`${styles.rentalStatus} ${styles.statusReturned}`}
                            >
                              {transaction.status || "Returned"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <Clock className={styles.emptyIcon} />
                      <h3 className={styles.emptyTitle}>
                        Ni zgodovine izposoj
                      </h3>
                      <p className={styles.emptyText}>
                        Nisi še izposodil nobene igre.
                      </p>
                      <Link to="/shop">
                        <Button>Prebrskaj igre</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <h1 className={styles.tabTitle}>Nastavitve</h1>
                  </div>
                  <div>
                    <p>Nastavitve prihajajo kmalu.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
