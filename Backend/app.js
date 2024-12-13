const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db.js");
const app = express();

const userRoutes = require("./routes/user.routes.js");

connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/users", userRoutes);

module.exports = app;
