const passport = require('passport');
const APIroutes = require('express').Router();
const { User } = require('./user');
const { Contact } = require('./contact');
const { Message } = require('./message');
const logRequest = require('./../utils/logRequest.js');
const { privateRouter, publicRouter } = require('./routers.js');

const controllers = {
    User,
    Contact,
    Message
};

APIroutes.use('/api', logRequest);
APIroutes.use('/api', publicRouter);
APIroutes.use(
    '/api',
    passport.authenticate('jwt', { session: false }),
    privateRouter
);

module.exports = { APIroutes, controllers };
