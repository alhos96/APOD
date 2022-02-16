const moment = require("moment");
const { Birthday } = require("../models/birthday.model");

exports.createBirthday = async (req, res, next) => {
  const { name, birthday, email, phone } = req.body;

  const formatedBirthday = birthday;

  await Birthday.create({
    name,
    birthday: formatedBirthday,
    email,
    phone,
    photo: req.file.filename,

    // keys required by calendar, it's how it makes events

    title: name,
    start: formatedBirthday,
    end: formatedBirthday,
  });

  // Return all birthdays with last created always first in array
  let allBirthdays = await Birthday.find().sort({ createdAt: "desc" });

  res.status(200).json(allBirthdays);
};

exports.getBirthdays = async (req, res, next) => {
  let allBirthdays = await Birthday.find().sort({ createdAt: "desc" });

  res.status(200).json(allBirthdays);
};
