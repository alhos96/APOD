const express = require("express");
const fileUpload = require("../middlewares/multer");

const router = express.Router();

const { createBirthday, getBirthdays } = require("../controllers/birthday.controller");

router.post("/form", fileUpload.single("img"), createBirthday);
router.get("/calendar", getBirthdays);

module.exports = router;
