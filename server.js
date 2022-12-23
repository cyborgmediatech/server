require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const loginData = require('./routes/login');
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

app.use(express.json());

app.use('/login', loginData);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is up & running!");
});
