'use strict';

// Basic Authentication Middleware

const base64 = require('base-64');
const users = require('../models/users-model');
const safi = new users() ;
// Reads the encoded username and password from the Authentication header
module.exports = async (req, res, next) => {
  // can declare it all async
  // Checks the Users model to see if this is a valid user and the right password
  if (!req.headers.authorization) {
    next('Invalid Login!!!');
    return;
  }

  // Basic abcdefjlk - the below code will pull out "abcdefjlk"
  let encodedPair = req.headers.authorization.split(' ').pop();


  const decoded = base64.decode(encodedPair); 
  let [username, password] = decoded.split(':'); 
  console.log('USERNAME + PASSWORD: ', username, password);

 
  try {
    const { valid , user } = await users.authenticate(username, password);

    console.log('VALID USER? :', valid);
    console.log('USER? :', user);
    req.valid = valid ;
    req.user = user ;
    req.token = safi.generateToken(user);
    console.log('REQ TOKEN  ________', req.token);
    // req.user = username;
    next();
  } catch (err) {
    next({
      message: 'Invalid User ID/Password',
      status: 401,
      statusMessage: 'Unauthorized',
    });
  }

  
};