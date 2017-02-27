var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function (nav) {
    authRouter.route('/signUp')
        .post(function(req, res) {
            // get user/pass
            console.log(req.body);
            var url = 'mongodb://localhost:12345/bookApi';
            mongodb.connect(url, function(err, db) {
                var userCollection = db.collection('users'); // if not exist mongo will create for us
                //console.log(userCollection.find());
                var user = {
                    username: req.body.signUpEmail, // our form field names
                    password: req.body.signUpPassword
                };
                // SHOULD FIRST DO A CHECK IF USER EXISTS!
                // HERE
                // ...
                userCollection.insert(user,
                    function(err, results) {
                        // req.login allows us to tell passport we are login, so if they register no need to login after
                        req.login(results.ops[0], function() {
                            res.redirect('/auth/profile');
                        });
                        db.close();
                    }
                );
            });
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', // this look at the session
            {
                /*Handler*/
                failureRedirect: '/'
            }),
            function(req,res) {
                res.redirect('/auth/profile');
            }
        );
    authRouter.route('/profile')
        .all(function(req, res, next) {
            // mean it did not pass the passport authenticate otherwise the req would have the user attached to it
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            // if signed in properly, passport will add .user to req
            console.log(req.user);
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;