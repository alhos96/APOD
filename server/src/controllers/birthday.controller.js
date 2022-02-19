const { Birthday } = require("../models/birthday.model");

exports.createBirthday = async (req, res, next) => {
  const { name, birthday, email, phone } = req.body;

  await Birthday.create({
    name,
    birthday,
    email,
    phone,
    photo: req.file.filename,

    // keys required by calendar, it's how it makes events

    title: name,
    start: birthday,
    end: birthday,
  });

  // Return all birthdays with last created always first in array
  let allBirthdays = await Birthday.find().sort({ createdAt: "desc" });

  res.status(200).json(allBirthdays);
};

exports.getBirthdays = async (req, res, next) => {
  let allBirthdays = await Birthday.find().sort({ createdAt: "desc" });

  res.status(200).json(allBirthdays);
};

exports.getSingleBirthday = async (req, res, next) => {
  const { id } = req.params;

  let singleBirthday = await Birthday.findOne({ _id: id });

  res.status(200).json(singleBirthday);
};

exports.deleteBirthday = async (req, res, next) => {
  const { id } = req.params;

  await Birthday.findByIdAndDelete(id);

  let allBirthdays = await Birthday.find().sort({ createdAt: "desc" });

  res.status(200).json(allBirthdays);
};

exports.editBirthday = async (req, res, next) => {
  const { name, birthday, email, phone, img } = req.body;
  const { id } = req.params;

  let birthdayForEdit = await Birthday.findOne({ _id: id });

  birthdayForEdit.name = name;
  birthdayForEdit.birthday = birthday;
  birthdayForEdit.email = email;
  birthdayForEdit.phone = phone;
  // depending if photo has been changed
  birthdayForEdit.photo = req.file ? req.file.filename : img;
  birthdayForEdit.title = name;
  birthdayForEdit.start = birthday;
  birthdayForEdit.end = birthday;

  await birthdayForEdit.save();

  let allBirthdays = await Birthday.find().sort({ createdAt: "desc" });

  res.status(200).json(allBirthdays);
};
