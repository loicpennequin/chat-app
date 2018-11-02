/**
 * Passport configuration.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const { User } = require('./../api').controllers;

const comparePassword = (password, user, done) => {
    return bcrypt.compare(password, user.password, (err, result) => {
        if (err) logger.error(err.stack);
        return result !== true ? done(null, false) : done(null, user.id);
    });
};

const getUser = async (field, value) =>
    (await User.findOne(
        { [field]: value },
        { serialize: { visibility: false } }
    )).data;

const authenticate = async (username, password, done) => {
    logger.debug('AuthService | authenticate');
    try {
        const user = await getUser('username', username);
        return user ? comparePassword(password, user, done) : done(null, user);
    } catch (err) {
        return done(err);
    }
};

const ensureAuth = async (req, jwtPayload, done) => {
    logger.debug('AuthService | ensureAuth');
    try {
        const user = await getUser('id', jwtPayload.data.id);
        user ? done(null, { id: user.id }) : done(null, false);
    } catch (err) {
        logger.error(err.stack);
        return done(err);
    }
};

module.exports = () => {
    passport.use(
        'local',
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            authenticate
        )
    );

    passport.use(
        'jwt',
        new JwtStrategy(
            {
                secretOrKey: process.env.TOKEN_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true
            },
            ensureAuth
        )
    );

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser(async (id, done) =>
        done(null, await getUser('id', id))
    );
};
