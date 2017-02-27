var passport = require('passport');

// a way to to do below instead of using revealing pattern
module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // package up user into session
    passport.serializeUser(function(user, done) {
        // call callback
        done(null, user);
    });

    // pull user from session
    passport.deserializeUser(function(user, done) {
        // call callback
        done(null, user);
    });

    // auth strategy... and other in diff file
    require('./strategies/local.strategy')();

};