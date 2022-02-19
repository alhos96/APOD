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

      // these fields are importan for calendar to work properly. title is name, start and end are birthday
      title: String,
      start: String,
      end: String,
    },
    {
      timestamps: true,
    }
  )
);
