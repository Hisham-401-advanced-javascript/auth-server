'use strict';

const mongoose = require('mongoose');

const users = mongoose.Schema({
  username : {type: String, required: true},
  password: {type: String, required: true},
});

module.exports = mongoose.model('Users', users);
// mongo shell CLI : categoriess collection
