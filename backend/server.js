const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const router = require("./Routes/index");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const corsOrigin = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

// connect DataBase (MongoDB)
connectDB();

// middlewares
app.use(cors(corsOrigin));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
