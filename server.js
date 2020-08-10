const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const {PORT, DB_URI} = process.env;
const contactRouter = require('./app/contact/contacts.router');
const authRouter = require('./app/auth/auth.router');
const userRouter = require('./app/user/user.router');

const runServer = async () => {
  const app = express();
  app.use(express.json());
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');

    app.use(cors({ origin: 'http://localhost:3000' }));
    app.use(morgan('combined'));
    
    app.use("/", express.static('public'));
    app.use('/images', express.static('public/images'));
    app.use('/users', userRouter);
    app.use('/contacts', contactRouter);
    app.use('/auth', authRouter);
  } catch (error) {
    if (error) {
      process.exit(1);
    }
  }

  app.listen(PORT, err =>
    err
      ? console.error(err)
      : console.info(`Server has been started on ${PORT} port`),
  );
};

module.exports = runServer;
