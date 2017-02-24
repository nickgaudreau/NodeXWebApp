var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookRouter = express.Router();

var router = function (nav) {

    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:12345/bookApi';
            mongodb.connect(url, function (err, db) {
                var bookCollection = db.collection('books');
                bookCollection.find({}).toArray(function(err, results) {
                    res.render('book-list', { // render view name
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                }); // wnat all
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id; // get url    /id
            var objId = new ObjectId(id);
            var url = 'mongodb://localhost:12345/bookApi';
            mongodb.connect(url).then(function (db) {
                var bookCollection = db.collection('books');
                bookCollection.findOne({_id : objId}).then(function(result) {
                    res.render('book', { // render view name
                        title: 'Book',
                        nav: nav,
                        book: result
                    });
                }).catch(function(err) {
                    console.log(err);
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    return bookRouter;
};
module.exports = router;