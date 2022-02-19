require("dotenv").config();
const { Birthday } = require("../models/birthday.model");
const { Admin } = require("../models/admin.model");
const mongoose = require("mongoose");
const birthdays = require("./data/birthdays.json");
const admin = require("./data/admin.json");
const config = require("../../config");
const bcrypt = require("bcrypt");

mongoose.connect(config.mongo).then(() => {
  // first drop all collections to avoid possible conflicts

  mongoose.connection.collections["birthdays"].drop(function (err) {
    console.log("birthdays collection dropped");
  });

  mongoose.connection.collections["admins"].drop(function (err) {
    console.log("admins collection dropped");
  });

  seed();
});

var done = 0;

function seed() {
  birthdays.forEach(async (birthday, i) => {
    let newBirthday = new Birthday({
      name: birthday.name,
      email: birthday.email,
      phone: birthday.phone,
      // convert field to date to avoid error
      birthday: new Date(birthday.birthday),
      photo: birthday.photo,

      title: birthday.name,
      start: new Date(birthday.birthday),
      end: new Date(birthday.birthday),
    });

    try {
      await newBirthday.save();
      done++;
    } catch (error) {
      console.log(error);
    }

    if (done === birthdays.length) {
      console.log("seeding birthdays done");

      let hashedPassword = await bcrypt.hash(admin.password, 12);
      let newAdmin = new Admin({
        name: admin.name,
        password: hashedPassword,
      });

      try {
        await newAdmin.save();
      } catch (error) {
        console.log(error);
      }

      console.log("seeding admin done");
      console.log("all done");
      mongoose.disconnect();
    }
  });
}
