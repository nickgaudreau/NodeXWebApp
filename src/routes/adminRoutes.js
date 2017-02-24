var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
        {
            title: 'Test insert many',
            genre: 'Historical Fiction2',
            author: 'Lev Nikolayevich Tolstoy2',
            read: false
        },
        {
            title: 'Test insert many2',
            genre: 'Historical Fiction22',
            author: 'Lev Nikolayevich Tolstoy22',
            read: false
        }
    ];
var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function(req,res) {
            var url = 'mongodb://localhost:12345/bookApi';
            mongodb.connect(url, function(err, db) {
                var bookCollection = db.collection('books');
                //console.log(bookCollection.find());
                bookCollection.insertMany(books, // one insert same but: coll.insertOne ({title:'test', genre:'ok', author:'well', read:true}, func...)
                    function(err, results) {
                        res.send(results);
                        db.close();
                    }
                );
            });
        });

    return adminRouter;
};

module.exports = router;