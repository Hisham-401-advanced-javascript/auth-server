'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./middleware/bearer-auth-middleware');

const permissions=require('./middleware/authorize');
router.get('/secret',bearerMiddleware, (req,res) => {
  console.log('>>>>>>>>>>>>>>>>>',req.user.username);
  res.status(200).send(req.user.username);
});

router.get('/read', bearerMiddleware, permissions('read'), read);
router.post('/add', bearerMiddleware, permissions('create'), add);
router.put('/change', bearerMiddleware, permissions('update'), change);
router.delete('/remove', bearerMiddleware, permissions('delete'), remove);
function read(req,res){
  res.status(201).send('Can read (:');
}

function add(req,res){
  res.status(201).send('Can add (:');
}

function change(req,res){
  res.status(201).send('Can change (:');
}

function remove(req,res){
  res.status(201).send('Can remove (:');
}

module.exports = router;
