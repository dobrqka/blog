const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
require("dotenv").config();
const passport = require("./config/passport");

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/api", routes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
