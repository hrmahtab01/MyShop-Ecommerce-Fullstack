const mongoose = require("mongoose");

const dbcconnect = () => {
  mongoose
    .connect(process.env.db_url)
    .then(() => {
      console.log("db conneted");
    })
    .catch((error) => {
      console.log("something went wrong in db connection");
    });
};

module.exports = dbcconnect;