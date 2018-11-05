const jwt = require('jsonwebtoken');
const passport = require('passport');

function AuthController() {
    const _generateToken = id =>
        jwt.sign(
            { data: { id }, timestamp: new Date() },
            process.env.TOKEN_SECRET,
            { expiresIn: 3600 }
        );

    this._generateToken = _generateToken.bind(this);

    this.ensureAuth = (req, res, next) => {
        passport.authenticate('jwt', { session: false })(req, res, next);
    };

    this.login = (req, res) => {
        logger.debug('AuthController | authenticate');
        const token = this._generateToken(req.user);
        res.json({ token, _userId: req.user });
    };

    this.logout = (req, res) => {
        logger.debug('Authservice | logout');
        req.logout();
        req.session.destroy();
        res.json({ message: 'OK' });
    };

    this.isLoggedIn = (req, res) => {
        res.json({ authenticated: req.isAuthenticated() });
    };
}

module.exports = new AuthController();
