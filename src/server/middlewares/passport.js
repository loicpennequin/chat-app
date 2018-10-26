/**
 * Passport configuration.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const AuthService = require('./../services/auth.js');
const models = require('./../models/index.js');

module.exports = () => {
    passport.use(
        'local',
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            AuthService.authenticate
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
            AuthService.ensureAuth
        )
    );

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
        return done(null, await models.User.findOne({ id }));
    });
};
