var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'userEmail', // in '' is our form name for the fields
            passwordField: 'userPassword'
        },
        function(username, password, done) { // this func is what it uses to determine if appropritae sign up

            var url = 'mongodb://localhost:12345/bookApi';
            mongodb.connect(url)
                .then(function(db) {
                    var userCollection = db.collection('users');
                    userCollection.findOne({username : username})
                        .then(function(results) {
                            if (results.password === password) {
                                var user = results;
                                done(null, user);
                            }
                            else {
                                console.log('Wrong password');
                                done(null, false, {message:'Wrong password'}); // this will fo to our failureRedirect in authRoutes.js signIn
                            }
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                })
                .catch(function(err) {
                    console.log(err);
                }
            );
        }
    ));

};