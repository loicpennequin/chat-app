const passport = require('passport');
const router = require('express').Router();
const ctrl = require('./auth.controller.js');
const logRequest = require('./../utils/logRequest.js');

router.post('/api/login', logRequest, passport.authenticate('local'), ctrl.login);
router.get('/api/logout', logRequest, ctrl.logout);
router.get('/api/isloggedin', logRequest, ctrl.isLoggedIn);

module.exports = router;
