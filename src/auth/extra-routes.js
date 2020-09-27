'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./middleware/bearer-auth-middleware');

router.get('/secret',bearerMiddleware, (req,res) => {
  console.log('>>>>>>>>>>>>>>>>>',req.user.username);
  res.status(200).send(req.user.username);
});

module.exports = router;