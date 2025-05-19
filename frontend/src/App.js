import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import "./index.css";
import ShopPage from "./pages/ShopPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AuthPage from "./pages/Auth.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import GamesPage from "./pages/GamesPage";
import Crazy8Game from "./pages/Crazy8s.jsx";
import GameDetailsPage from "./pages/GameDetailsPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TicTacToe from "./pages/TicTacToe.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <React.StrictMode>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/crazy8s" element={<Crazy8Game />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/games/:id" element={<GameDetailsPage />} />
          </Routes>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
