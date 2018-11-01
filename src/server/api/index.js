const passport = require('passport');
const APIroutes = require('express').Router();
const { User } = require('./user');
const { Contact } = require('./contact');
const logRequest = require('./../utils/logRequest.js');
const { privateRouter, publicRouter } = require('./routers.js');

const models = {
    User,
    Contact
};

APIroutes.use('/api', logRequest);
APIroutes.use('/api', publicRouter);
APIroutes.use(
    '/api',
    passport.authenticate('jwt', { session: false }),
    privateRouter
);

module.exports = { APIroutes, models };
