import { useState } from "react";
import Button from "../components/Button/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import styles from "../styles/authpage.module.css";
import login from "../static/login.jpg";
import { toast } from "react-toastify";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const { data } = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        // Save token to localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        toast.success("Prijava uspešna!");
        navigate("/");
      } else {
        // REGISTER
        if (formData.password !== formData.confirmPassword) {
          toast.error("Gesli se ne ujemata!");
          return;
        }
        await axios.post("http://localhost:5000/api/users/register", {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Registracija uspešna! Prijavite se.");
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Avtentikacija ni uspela. Preverite podatke."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.authContainer}>
            <div className={styles.authCard}>
              <div className={styles.authHeader}>
                <div className={styles.authTabs}>
                  <button
                    className={`${styles.authTab} ${
                      isLogin ? styles.activeTab : ""
                    }`}
                    onClick={() => setIsLogin(true)}
                  >
                    Vpis
                  </button>
                  <button
                    className={`${styles.authTab} ${
                      !isLogin ? styles.activeTab : ""
                    }`}
                    onClick={() => setIsLogin(false)}
                  >
                    Registracija
                  </button>
                </div>
                <h1 className={styles.authTitle}>
                  {isLogin ? "Dobrodošli nazaj" : "Ustvari račun"}
                </h1>
                <p className={styles.authDescription}>
                  {isLogin
                    ? "Prijavite se za dostop do svojega računa, izposoj in seznama želja."
                    : "Pridružite se Gamer's Gimmick in si začnite izposojati neverjetne družabne igre."}
                </p>
              </div>

              <form className={styles.authForm} onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName" className={styles.formLabel}>
                        Ime*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="Ime"
                        required={!isLogin}
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
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="Priimek"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email*
                  </label>
                  <div className={styles.inputWithIcon}>
                    <Mail className={styles.inputIcon} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.formLabel}>
                    Geslo*
                  </label>
                  <div className={styles.inputWithIcon}>
                    <Lock className={styles.inputIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Geslo"
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={togglePasswordVisibility}
                      tabIndex="-1"
                    >
                      {showPassword ? (
                        <EyeOff className={styles.toggleIcon} />
                      ) : (
                        <Eye className={styles.toggleIcon} />
                      )}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className={styles.formGroup}>
                    <label
                      htmlFor="confirmPassword"
                      className={styles.formLabel}
                    >
                      Potrdi geslo*
                    </label>
                    <div className={styles.inputWithIcon}>
                      <Lock className={styles.inputIcon} />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="Potrdi geslo"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {isLogin ? (
                  <div className={styles.formOptions}>
                    <label className={styles.formCheckbox}>
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                      />
                      <span>Zapomni si me</span>
                    </label>
                    <Link href="#" className={styles.forgotPassword}>
                      Ste pozabili geslo?
                    </Link>
                  </div>
                ) : (
                  <div className={styles.formGroup}>
                    <label className={styles.formCheckbox}>
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        required={!isLogin}
                      />
                      <span>
                        Strinjam se s{" "}
                        <Link href="#" className={styles.formLink}>
                          Pogoji uporabe
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className={styles.formLink}>
                          Politiko zasebnosti
                        </Link>
                      </span>
                    </label>
                  </div>
                )}

                <Button className={styles.submitButton}>
                  {isLogin ? "Vpis" : "Ustvari račun"}
                </Button>
              </form>

              <div className={styles.authFooter}>
                {isLogin ? (
                  <p>
                    Še nimate računa?{" "}
                    <button
                      className={styles.authSwitch}
                      onClick={() => setIsLogin(false)}
                    >
                      Ustvari račun
                    </button>
                  </p>
                ) : (
                  <p>
                    Že imate račun?{" "}
                    <button
                      className={styles.authSwitch}
                      onClick={() => setIsLogin(true)}
                    >
                      Vpis
                    </button>
                  </p>
                )}
              </div>
            </div>

            <div className={styles.authImage}>
              <img
                src={login}
                width={600}
                height={600}
                alt="Board games"
                className={styles.image}
              />
              <div className={styles.imageOverlay}>
                <h2 className={styles.overlayTitle}>
                  {isLogin ? "Dobrodošli nazaj!" : "Pridruži se skupnosti!"}
                </h2>
                <p className={styles.overlayText}>
                  {isLogin
                    ? "Dostopajte do svojega računa, da upravljate svoje izposoje in odkrijete nove igre."
                    : "Registrirajte se in začnite izposojati iz naše zbirke več kot 2.000 družabnih iger."}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
