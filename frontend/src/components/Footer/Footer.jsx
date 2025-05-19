import React from "react";
import { Link } from "react-router-dom";
import {
  Dice1Icon as DiceIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <DiceIcon className={styles.footerLogoIcon} />
              <span className={styles.footerLogoText}>Gamer's Gimmick</span>
            </div>
            <p className={styles.footerTagline}>
              Od leta 2025 vam na vrata prinašamo družabne igre. Naše poslanstvo
              je omogočiti, da so namizne igre dostopne vsem.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>Podjetje</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <Link href="#" className={styles.footerLink}>
                  O nas
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Kariere
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Mediji
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>Membership</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Cenik
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Kako deluje?
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Dostava
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>Support</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Kontaktiraj nas
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Center za pomoč
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Pogoji uporabe
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Politika zasebnosti
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Gamer's Gimmick. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://facebook.com"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              <Facebook className={styles.socialIcon} />
            </a>
            <a
              href="https://twitter.com"
              className={styles.socialLink}
              aria-label="Twitter"
            >
              <Twitter className={styles.socialIcon} />
            </a>
            <a
              href="https://instagram.com"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <Instagram className={styles.socialIcon} />
            </a>
            <a
              href="https://linkedin.com"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <Linkedin className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
