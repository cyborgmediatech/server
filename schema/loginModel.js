const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin-login", Schema);