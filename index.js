require("dotenv").config();
const exp = require("express");

const app = exp();

app.listen(process.env.PORT);