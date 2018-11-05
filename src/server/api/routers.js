const express = require('express');
const privateRouter = express.Router();
const publicRouter = express.Router();

require('./user').routes(privateRouter, publicRouter);
require('./contact').routes(privateRouter, publicRouter);
require('./message').routes(privateRouter, publicRouter);

module.exports = {
    privateRouter,
    publicRouter
};
