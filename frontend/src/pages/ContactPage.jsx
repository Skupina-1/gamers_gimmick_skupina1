import Button from "../components/Button/Button";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import styles from "../styles/contactpage.module.css";
import location from "../static/location.png";
import { useState } from "react";

const web3formsKey = process.env.REACT_APP_WEB3FORMS_KEY;

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Stopite v stik z nami</h1>
              <p className={styles.heroSubtitle}>
                Imate vprašanja ali povratne informacije? Veseli bomo vašega
                sporočila. Naša ekipa je tukaj, da vam pomaga.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className={styles.contactSection}>
            <div className={styles.contactContainer}>
              <div className={styles.contactInfo}>
                <h2 className={styles.contactTitle}>Kontaktni podatki</h2>
                <p className={styles.contactDescription}>
                  Pišite nam preko kateregakoli izmed spodnjih kanalov. Običajno
                  odgovorimo v roku 24 ur.
                </p>

                <div className={styles.contactCards}>
                  <div className={styles.contactCard}>
                    <div className={styles.contactCardIcon}>
                      <Mail className={styles.contactIcon} />
                    </div>
                    <h3 className={styles.contactCardTitle}>
                      Pošlji nam Email
                    </h3>
                    <p className={styles.contactCardText}>
                      hello@boardvault.com
                    </p>
                    <p className={styles.contactCardText}>
                      support@boardvault.com
                    </p>
                  </div>

                  <div className={styles.contactCard}>
                    <div className={styles.contactCardIcon}>
                      <Phone className={styles.contactIcon} />
                    </div>
                    <h3 className={styles.contactCardTitle}>Pokliči nas</h3>
                    <p className={styles.contactCardText}>+356 123-4567</p>
                  </div>

                  <div className={styles.contactCard}>
                    <div className={styles.contactCardIcon}>
                      <MapPin className={styles.contactIcon} />
                    </div>
                    <h3 className={styles.contactCardTitle}>Obišči nas</h3>
                    <p className={styles.contactCardText}>123 Game Street</p>
                    <p className={styles.contactCardText}>
                      Ljubljana, Slovenia
                    </p>
                  </div>

                  <div className={styles.contactCard}>
                    <div className={styles.contactCardIcon}>
                      <Clock className={styles.contactIcon} />
                    </div>
                    <h3 className={styles.contactCardTitle}>Delovne ure</h3>
                    <p className={styles.contactCardText}>
                      Ponedeljek-Petek 10:00-18:00
                    </p>
                  </div>
                </div>

                <div className={styles.mapContainer}>
                  <img
                    src={location}
                    width={600}
                    height={300}
                    alt="Map location"
                    className={styles.mapImage}
                  />
                  <div className={styles.mapOverlay}>
                    <Button className={styles.mapButton}>
                      View on Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              <div className={styles.contactForm}>
                <div className={styles.formContainer}>
                  <h2 className={styles.formTitle}>Pošlji nam sporočilo</h2>
                  <p className={styles.formDescription}>
                    Imaš vprašanje ali potrebuješ pomoč? Izpolni spodnji obrazec
                    in odgovorili ti bomo v najkrajšem možnem času.
                  </p>

                  <form
                    className={styles.form}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      try {
                        const response = await fetch(
                          "https://api.web3forms.com/submit",
                          {
                            method: "POST",
                            body: formData,
                          }
                        );
                        if (response.ok) {
                          setSuccess(true);
                          e.target.reset();
                        } else {
                          alert("Prišlo je do napake. Poskusite znova.");
                        }
                      } catch {
                        alert("Prišlo je do napake. Poskusite znova.");
                      }
                    }}
                  >
                    {success && (
                      <div className={styles.successMessage}>
                        Hvala za vaše sporočilo! Odgovorili vam bomo v
                        najkrajšem možnem času.
                      </div>
                    )}
                    <input
                      type="hidden"
                      name="access_key"
                      value={web3formsKey}
                    />
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="firstName" className={styles.formLabel}>
                          Ime*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className={styles.formInput}
                          placeholder="Ime"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="lastName" className={styles.formLabel}>
                          Priimek*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className={styles.formInput}
                          placeholder="Priimek"
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={styles.formInput}
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.formLabel}>
                          Telefon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className={styles.formInput}
                          placeholder="Telefon (neobvezno)"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="subject" className={styles.formLabel}>
                        Zadeva*
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className={styles.formInput}
                        placeholder="Za kaj gre?"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={styles.formLabel}>
                        Sporočilo*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className={styles.formTextarea}
                        placeholder="Tvoje sporočilo"
                        rows="6"
                        required
                      ></textarea>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formCheckbox}>
                        <input type="checkbox" required />
                        <span>
                          Strinjam se s{" "}
                          <Link href="#" className={styles.formLink}>
                            Politiko zasebnosti
                          </Link>
                        </span>
                      </label>
                    </div>

                    <Button className={styles.formButton} type="submit">
                      POŠLJI
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <div className={styles.faqContainer}>
              <h2 className={styles.faqTitle}>Pogosto zastavljena vprašanja</h2>
              <p className={styles.faqDescription}>
                Poiščite hitre odgovore na najpogostejša vprašanja o naših
                storitvah. Če ne najdete tistega, kar iščete, nas prosimo
                kontaktirajte.
              </p>

              <div className={styles.faqGrid}>
                <div className={styles.faqItem}>
                  <div className={styles.faqIcon}>
                    <MessageCircle className={styles.faqItemIcon} />
                  </div>
                  <h3 className={styles.faqItemTitle}>
                    Kako poteka postopek izposoje?
                  </h3>
                  <p className={styles.faqItemText}>
                    Oglejte si našo zbirko, izberite igre, ki jih želite
                    izposoditi, in izberite obdobje izposoje. Igre vam bomo
                    poslali z vnaprej plačano povratno nalepko. Ko končate, jih
                    preprosto zapakirajte in pošljite nazaj.
                  </p>
                </div>

                <div className={styles.faqItem}>
                  <div className={styles.faqIcon}>
                    <MessageCircle className={styles.faqItemIcon} />
                  </div>
                  <h3 className={styles.faqItemTitle}>
                    Kaj pa, če manjka del igre?
                  </h3>
                  <p className={styles.faqItemText}>
                    Vse igre pred pošiljanjem pregledamo, da zagotovimo, da so
                    popolne. Če opazite, da manjka del igre, nas kontaktirajte v
                    48 urah od prejema igre in pomagali vam bomo rešiti težavo.
                  </p>
                </div>

                <div className={styles.faqItem}>
                  <div className={styles.faqIcon}>
                    <MessageCircle className={styles.faqItemIcon} />
                  </div>
                  <h3 className={styles.faqItemTitle}>
                    Kako dolgo lahko obdržim igre?
                  </h3>
                  <p className={styles.faqItemText}>
                    Naši standardni obdobji izposoje so 7, 14 ali 30 dni. Če
                    potrebujete več časa, lahko izposojo podaljšate preko
                    svojega računa ali nas kontaktirate za pomoč.
                  </p>
                </div>

                <div className={styles.faqItem}>
                  <div className={styles.faqIcon}>
                    <MessageCircle className={styles.faqItemIcon} />
                  </div>
                  <h3 className={styles.faqItemTitle}>
                    Ali pošiljate v tujino?
                  </h3>
                  <p className={styles.faqItemText}>
                    Trenutno pošiljamo le znotraj Slovenije. Delamo pa na
                    širjenju naše storitve tudi na druge lokacije v prihodnosti.
                  </p>
                </div>
              </div>

              <div className={styles.faqCta}>
                <p className={styles.faqCtaText}>Še imate vprašanja?</p>
                <Button className={styles.faqCtaButton}>
                  Oglejte si vsa pogosta vprašanja
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
