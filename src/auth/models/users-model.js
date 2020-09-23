'use strict';

const Model = require('./model');
const schema = require('./users-schema');

class Users extends Model {

  constructor(schema) {
    super(schema);
  }
}

module.exports = new Users(schema);

// require it, then make instance new Categories();
// beside not doing new, use the methods directly + Singlton
