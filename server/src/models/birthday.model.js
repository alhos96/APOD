const mongoose = require("mongoose");

const { Schema, model } = mongoose;

exports.Birthday = model(
  "Birthday",
  new Schema(
    {
      name: String,
      birthday: Date,
      email: String,
      phone: Number,
      photo: String,
      title: String,
      start: String,
      end: String,
    },
    {
      timestamps: true,
    }
  )
);
