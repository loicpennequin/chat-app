/**
 * Authentication service. Provides methods to authenticate user and check incoming requests
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

const bcrypt = require('bcrypt');
const model = require('../models');
const logger = require('./../logger/logger.js');

class AuthService {
    static async _getUser(field, value) {
        return await model.User.findOne(
            { [field]: value },
            { serialize: { visibility: false } }
        );
    }

    static _comparePassword(password, user, done) {
        return bcrypt.compare(password, user.password, (err, result) => {
            if (err) logger.error(err.stack);
            return result !== true ? done(null, false) : done(null, user.id);
        });
    }

    async authenticate(username, password, done) {
        logger.debug('AuthService | authenticate');
        try {
            const user = await AuthService._getUser('username', username);
            return user
                ? AuthService._comparePassword(password, user, done)
                : done(null, user);
        } catch (err) {
            return done(err);
        }
    }

    async ensureAuth(req, jwtPayload, done) {
        logger.debug('AuthService | ensureAuth');
        try {
            const user = await AuthService._getUser('id', jwtPayload.data.id);
            user && req.user
                ? done(null, { id: user.id })
                : done(null, false);
        } catch (err) {
            logger.error(err.stack);
            return done(err);
        }
    }
}

module.exports = new AuthService();
