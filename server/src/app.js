const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("../config");

const app = express();

const birthdayRoutes = require("./routes/birthday.routes");
const adminRoutes = require("./routes/admin.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api", birthdayRoutes);
app.use("/admin", adminRoutes);

mongoose
  .connect(config.mongo)
  .then(() => {
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
  })
  .catch((err) => console.log(err));
