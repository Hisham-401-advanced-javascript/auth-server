'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const err500 = require('./middleware/500.js');
const err404 = require('./middleware/404.js');
const userRouters = require('./auth/router');

app.use(express.json()); // body
app.use(cors());
app.use(morgan('dev'));
app.use(userRouters);

// Global ERROR MiddleWare
app.use('*',err404); // 404
app.use(err500); //500

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
  },
};
