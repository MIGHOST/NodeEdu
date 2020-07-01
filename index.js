// const dotenv = require("dotenv");
// dotenv.config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
// const PORT = dotenv.config();
const PORT = 3000;
const {contactRouter} = require("./app/router/contacts.router");

app.use(express.json());
app.use(cors({ origin: "http:/localhost:3000" }));
app.use(morgan("combined"));

app.use("/contacts", contactRouter);

app.listen(PORT, (err) =>
  err
    ? console.error(err)
    : console.info(`Server has been started on ${PORT} port`)
);
