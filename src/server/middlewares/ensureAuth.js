const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false })(req, res, next);
};
