const express = require("express");
const app = express();
const index = require("./route/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const corsOption = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use(cookieParser());

//라우팅
app.use(index);

app.listen(process.env.POST, () => {
  console.log("server Port 8080");
});
