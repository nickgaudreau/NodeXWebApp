var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            bookId: 656,
            read: false
        },
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            bookId: 50,
            read: false
        },
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'H. G. Wells',
            bookId:51,
            read: false
        },
        {
            title: 'A Journey into the Center of the Earth',
            genre: 'Science Fiction',
            author: 'Jules Verne',
            bookId:52,
            read: false
        },
        {
            title: 'The Dark World',
            genre: 'Fantasy',
            author: 'Henry Kuttner',
            bookId:53,
            read: false
        },
        {
            title: 'The Wind in the Willows',
            genre: 'Fantasy',
            author: 'Kenneth Grahame',
            bookId:44,
            read: false
        },
        {
            title: 'Life On The Mississippi',
            genre: 'History',
            author: 'Mark Twain',
            bookId: 55,
            read: false
        },
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Lev Nikolayevich Tolstoy',
            bookId: 66,
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