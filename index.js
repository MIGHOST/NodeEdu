const dotenv = require('dotenv');
dotenv.config();
// const cors = require('cors');
// const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
// const Contact = require('./app/contact/contacts.router');
// const { contactRouter } = require('./app/router/contacts.router');
const contactRouter = require('./app/contact/contacts.router');
const runServer = async () => {
  const app = express();
  app.use(express.json());
  try {
  await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');

    // app.use(cors({ origin: 'http://localhost:7770' }));
    // app.use(morgan('combined'));

    app.use('/contacts', contactRouter);
    // app.use((err, req, res, next) => {
    //   if (!err) return next();

    //   console.error(err);

    //   res.status(500).send({ message: err.message });
    // });
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, err =>
    err
      ? console.error(err)
      : console.info(`Server has been started on ${PORT} port`),
  );
};

runServer();
