const express = require("express");
const router = require("./Router");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");
const dbcconnect = require("./dbConfig/dbconnect");

app.use(express.json());

app.use(cors());
dbcconnect();

app.use(router);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
