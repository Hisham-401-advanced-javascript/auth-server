'use strict';

const express = require('express');
const router = express.Router();
const users = require('./users');
const basicAuth = require('./middleware/basic-auth-middleware');
// const mongoDB = require('./models/users/users-model');

router.post('/signup',signup);
router.post('/signin',basicAuth,signin);
router.get('/users',list);

/**
 *
 * @param {obj} req
 * @param {obj} res
 * @param {function} next
 */
function signup(req, res) {
  //sign up route if we have the user, return failure, else return generated token.
  let user = req.body;
  console.log(user);
  users.save(user).then(result => {
    // generate a token and return it.
    let token = users.generateToken(result);
    res.cookie(token);
    res.status(200).send(token);
  }).catch(err=> {
    console.log('ERR!!>>>>>>>>' , err);
    res.status(403).send('Invalid Signup! email is taken');
  });
}

/**
 * @param {obj} req
 * @param {obj} res
 * @param {function} next
 */
// check this username if the password submitted matches the encrypted one we have saved in our db
function signin(req, res ) {
  res.cookie(req.token);
  res.status(200).send(req.token); // return token 4
}

/**
 * @param {obj} req
 * @param {obj} res
 * @param {function} next
 */
function list(req, res ) {
  users.list(undefined).then(result => {
    console.log('prove of life');
    console.log(result);
    res.status(200).send(result);
  }).catch(err=> {
    console.log('ERR!!' , err);
    res.status(403).send('Listing error');
  });
}

module.exports = router;
