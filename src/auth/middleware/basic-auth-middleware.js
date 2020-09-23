'use strict';

const users = require('../users');
const base64 = require('base-64');

module.exports = (req, res, next) => {
  // check username and password if we have them sent in the request
  // req : params body qs headers
  // req.headers.authorization, encoded username and password
  if (!req.headers.authorization) {
    console.log(req.headers.authorization);
    next('invalid Login');
    return;
  }
  //  headers value :
  // Pull out this encoded part and split the header value
  console.log('req.headers.authorization >>>> ',req.headers.authorization);
  let basic = req.headers.authorization.split(' ').pop();
  console.log(basic);

  // decode to user:pass
  let [user, pass] = base64.decode(basic).split(':'); // [user, pass];
  // let user = res[0];
  // let pass = res[1];
  console.log(user);
  console.log(pass);

  users.authenticateBasic(user, pass).then(validUser => {
    req.token = users.generateToken(validUser);
    next();
  })
    .catch(err => next('Invalid Login!!' , err));

};
