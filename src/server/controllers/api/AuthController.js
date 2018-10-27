/*
* Authentication controller.
*
*/
const jwt = require('jsonwebtoken');
const logger = require('./../../logger/logger.js')(module);

class AuthController {
    constructor() {
        this.generateToken = this.generateToken.bind(this);
    }

    authenticate(req, res) {
        logger.debug('Authcontroller | authenticate');
        const token = this.generateToken(req.user);
        res.json({ token, _userId: req.user });
    }

    generateToken(id) {
        return jwt.sign(
            { data: { id }, timestamp: new Date() },
            process.env.TOKEN_SECRET,
            { expiresIn: 3600 }
        );
    }

    refreshToken(req, res, next) {
        req.token = this.generateToken(req.user.id);
        next();
    }
}

module.exports = new AuthController();
