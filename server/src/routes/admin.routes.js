const express = require("express");

const router = express.Router();

const { loginAdmin, registerAdmin } = require("../controllers/admin.controller");

router.post("/", loginAdmin);
router.post("/register", registerAdmin);

module.exports = router;
