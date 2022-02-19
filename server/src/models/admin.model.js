const mongoose = require("mongoose");

const { Schema, model } = mongoose;

exports.Admin = model(
  "Admin",
  new Schema(
    {
      name: String,
      password: String,
    },
    {
      timestamps: true,
    }
  )
);
