const APIroutes = require('express').Router();
const { User, userRoutes } = require('./user');
const { Contact, contactRoutes } = require('./contact');
const logRequest = require('./../utils/logRequest.js');

const models = {
    User,
    Contact
};

APIroutes.use('/api', logRequest, userRoutes);

module.exports = { APIroutes, models };
