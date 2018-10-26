const router = require('express').Router();
const ctrl = require('./../../controllers/api').Auth;
const ensureAuth = require('./../../middlewares/ensureAuth.js');
const passport = require('passport');

router.post('/login', passport.authenticate('local'),(req, res, next) => ctrl.authenticate(req, res));
router.get('/logout', (req, res) => {
    logger.debug('Authservice | logout');
    req.logout();
    req.session.destroy();
    res.send();
});
router.get(
    '/isloggedin',
    ensureAuth,
    (req, res, next) => ctrl.refreshToken(req, res, next),
    ({ token, user }, res) => {
        res.json({ token, _userId: user.id });
    }
);

module.exports = router;
