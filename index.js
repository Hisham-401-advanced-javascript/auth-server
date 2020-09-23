'use strict';

const mongoose = require('mongoose');
const server = require('./src/server');
require('dotenv').config();

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URL, mongooseOptions);
server.start();
