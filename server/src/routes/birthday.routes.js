const express = require("express");
const fileUpload = require("../middlewares/multer");

const router = express.Router();

const { createBirthday, getBirthdays, getSingleBirthday, editBirthday, deleteBirthday } = require("../controllers/birthday.controller");

router.post("/form", fileUpload.single("img"), createBirthday);
router.get("/calendar", getBirthdays);
router.get("/edit/:id", getSingleBirthday);
router.patch("/edit/:id", fileUpload.single("img"), editBirthday);

router.delete("/:id", deleteBirthday);

module.exports = router;
