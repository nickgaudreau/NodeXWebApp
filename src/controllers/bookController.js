// Controllers using Revealing Module Patterns
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {
    var middleware = function(req, res, next) {
        // mean it did not pass the passport authenticate otherwise the req would have the user attached to it
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };
    var getAll = function (req, res) {
            var url = 'mongodb://localhost:12345/bookApi';
            mongodb.connect(url, function (err, db) {
                var bookCollection = db.collection('books');
                bookCollection.find({}).toArray(function(err, results) {
                    console.log(results);
                    res.render('book-list', { // render view name
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                }); // wnat all
            });
        };

    var getById = function (req, res) {
            var id = req.params.id; // get url    /id
            var objId = new ObjectId(id);
            var url = 'mongodb://localhost:12345/bookApi';
            mongodb.connect(url).then(function (db) {
                var bookCollection = db.collection('books');
                bookCollection.findOne({_id : objId}).then(function(result) {

                    // we will pass new mongo field isbn in , then on callback exec our rendering with new data captured attach it to result
                    if (result.bookId) {
                        bookService.getBookById(result.bookId, function(err, goodreadBook) {
                            result.goodreadData = goodreadBook;
                            res.render('book', { // render view name
                                title: 'Book',
                                nav: nav,
                                book: result // now we have new data attahced to rssult
                            });
                        });
                    }
                    else {
                        res.render('book', { // render view name
                                title: 'Book',
                                nav: nav,
                                book: result // now we have new data attahced to rssult
                            });
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        };

    // revealing pattern return json object of public functions, not specified in return JSON object are privates..
    return {
        middleware : middleware,
        getAll: getAll,
        getById: getById
    };
};

module.exports = bookController;