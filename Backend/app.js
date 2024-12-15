const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db.js");
const app = express();

const userRoutes = require("./routes/user.routes.js");
const captainRoutes = require("./routes/captain.routes.js");

connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
