const express = require('express');
const privateRouter = express.Router();
const publicRouter = express.Router();

exports.routers = { publicRouter, privateRouter };

require('./apiRoutes/userRoutes');
require('./apiRoutes/contactRoutes');

module.exports = { publicRouter, privateRouter };
