import Button from "../components/Button/Button";
import landingImg from "../static/landingimg.png";
import customer1 from "../static/customer1.png";
import customer2 from "../static/customer2.png";
import customer3 from "../static/customer3.png";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

import { Package, Clock, Users, Star } from "lucide-react";
import styles from "../styles/homepage.module.css";

export default function HomePage() {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>
                  Igraj trajnostno – najemi igro.
                </h1>
                <p className={styles.heroDescription}>
                  Odkrijte, najemite in uživajte v več tisoč namiznih igrah, ki
                  vam jih dostavimo do vrat. Brez obveznosti, samo neskončna
                  zabava.
                </p>
                <div className={styles.heroActions}>
                  <Link to="/shop">
                    <Button size="lg" className={styles.primaryButton}>
                      Prebrskaj igre
                    </Button>
                  </Link>
                </div>
              </div>
              <div className={styles.heroImage}>
                <img
                  src={landingImg}
                  width={500}
                  height={500}
                  alt="Board games collection"
                  className={styles.image}
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className={styles.features}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Zakaj izbrati Gamer's Gimmick?
              </h2>
              <p className={styles.sectionDescription}>
                Pri nas je igranje družabnih iger lažje, cenovno ugodnejše in
                zabavnejše kot kdaj koli prej.
              </p>
            </div>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Package className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Velik izbor</h3>
                <p className={styles.featureDescription}>
                  Dostop do več kot 2.000 družabnih iger, od klasičnih do
                  najnovejših izdaj. Tedensko dodajanje novih iger.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Clock className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Prilagodljivi najemi</h3>
                <p className={styles.featureDescription}>
                  Igre lahko obdržite, kolikor časa želite. Igre lahko kadar
                  koli vrnete z našimi vnaprej plačanimi nalepkami za
                  pošiljanje. Brez zamudnine.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Users className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Izbire skupnosti</h3>
                <p className={styles.featureDescription}>
                  Odkrijte nove igre s priporočili naše skupnosti navdušencev
                  nad družabnimi igrami.
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className={styles.testimonials}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Kaj pravijo naši člani</h2>
              <p className={styles.sectionDescription}>
                Pridružite se tisočim zadovoljnim igralcem družabnih iger, ki so
                odkrili boljši način igranja.
              </p>
            </div>
            <div className={styles.testimonialGrid}>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={styles.starIcon} />
                  ))}
                </div>
                <p className={styles.testimonialText}>
                  "Gamer's Gimmick je popolnoma spremenil način, kako naša
                  družina uživa v igrah. Odkrili smo toliko neverjetnih iger, ki
                  jih ne bi nikoli kupili. Otroci so vedno navdušeni, ko dobijo
                  novo igro!"
                </p>
                <div className={styles.testimonialAuthor}>
                  <img
                    src={customer2}
                    width={50}
                    height={50}
                    alt="Jessica M."
                    className={styles.testimonialAvatar}
                  />
                  <div>
                    <p className={styles.testimonialName}>Nina M.</p>
                    <p className={styles.testimonialRole}>Družinsko članstvo</p>
                  </div>
                </div>
              </div>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={styles.starIcon} />
                  ))}
                </div>
                <p className={styles.testimonialText}>
                  "Kot navdušen zbiratelj sem bil sprva skeptičen. Toda to, da
                  lahko igre preizkusim pred nakupom, mi je prihranilo veliko
                  denarja in prostora na policah. Njihove storitve za stranke so
                  prav tako vrhunske!"
                </p>
                <div className={styles.testimonialAuthor}>
                  <img
                    src={customer1}
                    width={50}
                    height={50}
                    alt="David K."
                    className={styles.testimonialAvatar}
                  />
                  <div>
                    <p className={styles.testimonialName}>David K.</p>
                    <p className={styles.testimonialRole}>Premium član</p>
                  </div>
                </div>
              </div>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={styles.starIcon} />
                  ))}
                </div>
                <p className={styles.testimonialText}>
                  "Odkar smo se pridružili Gamer's Gimmick, se je naš večer
                  družabnih iger zelo izboljšal. Vsak teden lahko igramo novo
                  igro, ne da bi pri tem oškodovali banko. Dostava je vedno
                  pravočasna, igre pa so v popolni v odličnem stanju"
                </p>
                <div className={styles.testimonialAuthor}>
                  <img
                    src={customer3}
                    width={50}
                    height={50}
                    alt="Marcus T."
                    className={styles.testimonialAvatar}
                  />
                  <div>
                    <p className={styles.testimonialName}>Mark T.</p>
                    <p className={styles.testimonialRole}>Skupinsko članstvo</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className={styles.cta}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ste pripravljeni začeti igrati?
              </h2>
              <p className={styles.ctaDescription}>
                Pridružite se Gamer's Gimmick še danes in dobite prvi mesec s
                50% popustom. Brez obveznosti, prekličite ga kadarkoli.
              </p>
              <div className={styles.ctaActions}>
                <Button size="lg" className={styles.primaryButton}>
                  Začnite z brezplačnim preizkusom
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={styles.secondaryButton}
                >
                  Oglejte si možnosti članstva
                </Button>
              </div>
              <p className={styles.ctaNote}>
                Za brezplačni preizkus ni potrebna kreditna kartica. 14-dnevni
                brezplačni dostop do našega osnovnega plana.
              </p>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
