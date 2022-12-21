require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
    }
  )
  .catch((err) => {
    console.log(err);
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is up & running!");
});
