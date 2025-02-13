const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
require("dotenv").config();
const passport = require("./config/passport");

app.use(
  cors({
    origin: [process.env.ADMIN_URL, process.env.FRONT_URL],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/api", routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
