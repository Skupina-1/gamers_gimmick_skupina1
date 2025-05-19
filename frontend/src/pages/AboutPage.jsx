import Layout from "../components/Layout";
import location from "../static/location.png";
import aboutus1 from "../static/aboutus1.jpg";
import aboutus2 from "../static/aboutus2.jpg";
import employee1 from "../static/employee1.jpg";
import employee2 from "../static/employee2.jpg";
import employee3 from "../static/employee3.jpg";
import employee4 from "../static/employee4.jpg";
import { Mail, MapPin, Phone } from "lucide-react";
import styles from "../styles/aboutpage.module.css";

export default function AboutPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>O nas</h1>
              <p className={styles.heroSubtitle}>
                Ponujamo veselje do družabnih iger vsakomur, po en najem
                naenkrat.
              </p>
            </div>
          </section>

          {/* About&Mission Section */}
          <section className={styles.section}>
            <div className={styles.sectionContent}>
              <div className={styles.missionContainer}>
                <div className={styles.missionText}>
                  <h2 className={styles.sectionTitle}>Naša zgodba</h2>
                  <p className={styles.paragraph}>
                    Naša izposojevalnica družabnih iger je nastala iz pristne
                    ljubezni do druženja, ustvarjalnosti in zabave brez ekranov.
                    V letu 2022 smo začeli z majhno kolekcijo iger, ki so jih
                    naši prijatelji in družina z veseljem preizkušali. Kmalu smo
                    opazili, da vedno več ljudi išče cenovno ugoden način, kako
                    preživeti kakovosten čas doma ali s prijatelji.
                  </p>
                  <p className={styles.paragraph}>
                    Naša misija je ljudem približati svet družabnih iger in jim
                    pokazati, da lahko igra poveže tudi tiste, ki se redko
                    družijo ali imajo različne interese. Verjamemo v moč igre
                    kot orodje za krepitev odnosov, spodbujanje razmišljanja in
                    predvsem - kot vir smeha.
                  </p>
                </div>
                <div className={styles.missionImage}>
                  <img
                    src={aboutus1}
                    width={600}
                    height={400}
                    alt="People playing board games"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className={styles.section + " " + styles.altSection}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle + " " + styles.centeredTitle}>
                Zakaj izbrati nas?
              </h2>
              <div className={styles.storyContainer}>
                <div className={styles.storyImage}>
                  <img
                    src={aboutus2}
                    width={600}
                    height={400}
                    alt="BoardVault founders"
                    className={styles.image}
                  />
                </div>
                <div className={styles.storyText}>
                  <p className={styles.paragraph}>
                    Naša zbirka obsega več kot 150 preverjenih in skrbno
                    urejenih družabnih iger, ki zadovoljijo različne okuse,
                    starosti in priložnosti – od družinskih klasik in zabavnih
                    iger za večje skupine do tematskih strateških dvobojev za
                    dva. Igre so pregledno razvrščene in opremljene z jasnimi
                    navodili v slovenskem jeziku ter video vodiči, ki olajšajo
                    učenje pravil in omogočajo hiter začetek igranja – tudi za
                    začetnike.
                  </p>
                  <p className={styles.paragraph}>
                    Pri nas verjamemo v preprostost in prilagodljivost. Zato ne
                    zahtevamo kavcije in vam omogočamo tako kratkoročno kot
                    dolgoročno izposojo – popolnoma brez skrbi. Če niste
                    prepričani, katera igra je prava za vaš dogodek, skupino ali
                    razpoloženje, vam z veseljem brezplačno svetujemo in
                    pomagamo pri izbiri najboljše možnosti.
                  </p>
                  <p className={styles.paragraph}>
                    Poleg vsega nudimo hitro in zanesljivo dostavo po Ljubljani
                    – v mnogih primerih že v 24 urah. Ne glede na to, ali
                    pripravljate sproščeno družinsko druženje, zabavo s
                    prijatelji ali si želite večer preživeti v napetem
                    strateškem dvoboju – pri nas boste zagotovo našli nekaj
                    zase. Naša strast so igre, vaše zadovoljstvo pa naše vodilo.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className={styles.section}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle + " " + styles.centeredTitle}>
                Naša ekipa
              </h2>
              <p className={styles.sectionDescription}>
                Strastni posamezniki, ki stojijo za Gamer's Gimmick in si
                prizadevajo širiti veselje do družabnih iger.
              </p>
              <div className={styles.teamGrid}>
                <div className={styles.teamMember}>
                  <div className={styles.teamMemberImage}>
                    <img
                      src={employee1}
                      width={300}
                      height={300}
                      alt="Alex C."
                      className={styles.teamImage}
                    />
                  </div>
                  <h3 className={styles.teamMemberName}>Alex C.</h3>
                  <p className={styles.teamMemberRole}>
                    Soustanovitelj in direktor (CEO)
                  </p>
                  <p className={styles.teamMemberBio}>
                    Navdušenec nad strateškimi igrami z izkušnjami iz
                    tehnoloških startupov. Alex skrbi za poslovno vodenje in
                    vizijo prihodnosti Gamer's Gimmick.
                  </p>
                </div>
                <div className={styles.teamMember}>
                  <div className={styles.teamMemberImage}>
                    <img
                      src={employee3}
                      width={300}
                      height={300}
                      alt="Jan E."
                      className={styles.teamImage}
                    />
                  </div>
                  <h3 className={styles.teamMemberName}>Jan E.</h3>
                  <p className={styles.teamMemberRole}>
                    Soustanovitelj in operativni direktor (COO)
                  </p>
                  <p className={styles.teamMemberBio}>
                    Nekdanji vodja logistike in zbiratelj euro iger. Jamie
                    nadzoruje naše operacije ter skrbi, da igre prispejo
                    pravočasno in v brezhibnem stanju.
                  </p>
                </div>
                <div className={styles.teamMember}>
                  <div className={styles.teamMemberImage}>
                    <img
                      src={employee2}
                      width={300}
                      height={300}
                      alt="Nik R."
                      className={styles.teamImage}
                    />
                  </div>
                  <h3 className={styles.teamMemberName}>Nik R.</h3>
                  <p className={styles.teamMemberRole}>
                    Soustanovitelj in tehnični direktor (CTO)
                  </p>
                  <p className={styles.teamMemberBio}>
                    Oblikovalec družabnih iger in spletni razvijalec. Taylor je
                    zasnoval našo platformo in vodi ekipo za izbor iger, da vam
                    lahko ponudimo najboljšo zbirko.
                  </p>
                </div>
                <div className={styles.teamMember}>
                  <div className={styles.teamMemberImage}>
                    <img
                      src={employee4}
                      width={300}
                      height={300}
                      alt="Lina M."
                      className={styles.teamImage}
                    />
                  </div>
                  <h3 className={styles.teamMemberName}>Lina M.</h3>
                  <p className={styles.teamMemberRole}>Skrbnik skupnosti</p>
                  <p className={styles.teamMemberBio}>
                    Ljubiteljica zabavnih iger in strokovnjakinja za družbena
                    omrežja. Morgan gradi našo skupnost in organizira virtualne
                    igralne večere za člane.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className={styles.section + " " + styles.altSection}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle + " " + styles.centeredTitle}>
                Naše vrednote
              </h2>
              <div className={styles.valuesGrid}>
                <div className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>Dostopnost</h3>
                  <p className={styles.valueDescription}>
                    Verjamemo, da bi morali imeti vsi možnost uživati v
                    kakovostnih družabnih igrah – ne glede na proračun ali
                    prostorske omejitve.
                  </p>
                </div>
                <div className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>Skupnost</h3>
                  <p className={styles.valueDescription}>
                    Spodbujamo prijazno in vključujočo skupnost igralcev, ki si
                    med seboj delijo priporočila, izkušnje in navdušenje nad
                    igrami.
                  </p>
                </div>
                <div className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>Trajnost</h3>
                  <p className={styles.valueDescription}>
                    Z izmenjevanjem in deljenjem virov zmanjšujemo odpadke in
                    vpliv na okolje, hkrati pa povečujemo veselje, ki ga vsaka
                    igra prinaša.
                  </p>
                </div>
                <div className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>Kakovost</h3>
                  <p className={styles.valueDescription}>
                    Naše igre vzdržujemo po najvišjih standardih in ponujamo le
                    tiste naslove, za katere verjamemo, da zagotavljajo izjemno
                    igralno izkušnjo.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className={styles.section}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle + " " + styles.centeredTitle}>
                Kontakt
              </h2>
              <div className={styles.contactContainer}>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <Mail className={styles.contactIcon} />
                    <div>
                      <h3 className={styles.contactTitle}>Email</h3>
                      <p className={styles.contactText}>
                        info@gamersgimmick.com
                      </p>
                      <p className={styles.contactText}>
                        podpora@gamersgimmick.com
                      </p>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <Phone className={styles.contactIcon} />
                    <div>
                      <h3 className={styles.contactTitle}>Telefon</h3>
                      <p className={styles.contactText}>031 123 456</p>
                      <p className={styles.contactText}>
                        Pon-Pet, 10:00-18:00{" "}
                      </p>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <MapPin className={styles.contactIcon} />
                    <div>
                      <h3 className={styles.contactTitle}>Obišči nas</h3>
                      <p className={styles.contactText}>123 Game Street</p>
                      <p className={styles.contactText}>Ljubljana, Slovenija</p>
                    </div>
                  </div>
                </div>
                <div className={styles.contactMap}>
                  <img
                    src={location}
                    width={300}
                    height={300}
                    alt="Location pin"
                    className={styles.image}
                  ></img>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
