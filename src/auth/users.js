'use strict';
require('dotenv').config();
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; // place this in your .env
console.log('token',secret);
const mongoDB = require('./models/users-model');
// let obj={}; //db
let users = {}; //exporting


/**
 * @param(obj)
 */
users.save = async function (record) {
  let reading = await mongoDB.read(record.username);
  if (!reading[0]) {
    console.log(record.password);
    record.password  = await bcrypt.hash(record.password,5);
    await mongoDB.create(record);
    return record;
  }
  // let addNewNote =await mongoDB.create(record);
  return Promise.reject();
};

/**
 * @param(string)
 */
// compare the password with the encrypted one
users.authenticateBasic = async function(username, password) {
  // let reading = await mongoDB.read(record.username);
  // console.log(password)
  // console.log(username)
  let reading = await mongoDB.read(username);
  // console.log(reading[0].password)
  // console.log('hello');
  let valid = await bcrypt.compare(password, reading[0].password);
  return valid ? username : Promise.reject();
};

/**
 * @param(obj)
 */
users.generateToken = function (user) {
  let token = jwt.sign({username: user.username}, secret,{expiresIn:900} );
  console.log(token);
  return token;
};

users.list = async function(record){
  let reading = await mongoDB.read(record);
  
  return reading;
};

users.verifyToken = function (token) {
  console.log('Token >>>>>>>>>>>>>>>>',token);
  return  jwt.verify(token, secret,async function(err, decoded){
    if (err) {
      console.log('err>>> ', err);
      return Promise.reject(err);
    }

    console.log('decoded >>>> ',decoded); // {username: usernameValue, ...}
    console.log('decoded >>>> ',decoded.username); // {username: usernameValue, ...}
    let username = decoded['username']; // decoded.username
    console.log('username >>>>>>>>>>>>>>>>>>>>>>>',username);

    let reading = await mongoDB.read(username);
    console.log('');
    console.log(reading);
    if (reading[0]) {
      return Promise.resolve(decoded);
    } 
    return Promise.reject();
  });
};

module.exports = users;