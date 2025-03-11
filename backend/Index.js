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

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
