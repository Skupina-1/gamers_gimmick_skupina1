import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import {
  ShoppingCart,
  User,
  Dice1Icon as DiceIcon,
  Menu,
  X,
} from "lucide-react";

import styles from "./header.module.css";
import { toast } from "react-toastify";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.logoInner}>
              <DiceIcon className={styles.logoIcon} />
              <span className={styles.logoText}>Gamer's Gimmick</span>
            </div>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Domov
          </Link>
          <Link to="/shop" className={styles.navLink}>
            Spletna trgovina
          </Link>
          <Link to="/about" className={styles.navLink}>
            O nas
          </Link>
          <Link to="/contact" className={styles.navLink}>
            Kontakt
          </Link>
          <Link to="/games" className={styles.navLink}>
            Igre
          </Link>
        </nav>

        <div className={styles.headerActions}>
          <button
            className={styles.iconButton}
            onClick={() => {
              if (isLoggedIn) {
                navigate("/cart");
              } else {
                toast.info(
                  "Za ogled in dodajanje v košarico se morate prijaviti."
                );
                navigate("/auth");
              }
            }}
            aria-label="Košarica"
          >
            <ShoppingCart className={styles.icon} />
          </button>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className={styles.iconButton}>
                <User className={styles.icon} />
              </Link>
              <Button className={styles.ctaButton} onClick={handleLogout}>
                ODJAVA
              </Button>
            </>
          ) : (
            <Button
              className={styles.ctaButton}
              onClick={() => navigate("/auth")}
            >
              VPIS
            </Button>
          )}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
          >
            <Menu className={styles.menuIcon} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <div className={styles.logo}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <div className={styles.logoInner}>
                  <DiceIcon className={styles.logoIcon} />
                  <span className={styles.logoText}>BoardVault</span>
                </div>
              </Link>
            </div>
            <button
              className={styles.closeMenuButton}
              onClick={toggleMobileMenu}
            >
              <X className={styles.closeIcon} />
            </button>
          </div>
          <nav className={styles.mobileNav}>
            <Link
              href="/#features"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#testimonials"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/shop"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Games
            </Link>
            <Link
              href="/about"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
          <div className={styles.mobileActions}>
            <Link
              href="/cart"
              className={styles.mobileActionLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart className={styles.mobileActionIcon} />
              <span>Cart</span>
            </Link>
            <Link
              href="/profile"
              className={styles.mobileActionLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className={styles.mobileActionIcon} />
              <span>Profile</span>
            </Link>
            <Button
              className={styles.mobileCtaButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
