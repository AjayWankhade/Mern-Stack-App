const express = require("express");
const mongoose = require("mongoose");
const app = express();
const env = require("dotenv");
const User = require("./models/userModel");
const router = require("./routes/userRoutes");
const cors = require("cors");

env.config();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("error to connect mongodb", err);
  });

app.use("/api", router);
