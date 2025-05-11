const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//routes
const gameRoutes = require("./routes/gameRoutes");
app.use("/api/games", gameRoutes);

const basketRoutes = require("./routes/basketRoutes");
app.use("/api/basket", basketRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

//server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
