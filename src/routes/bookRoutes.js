var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bookRouter = express.Router();

var router = function (nav) {

    // get our controller up a level
    var bookController = require('../controllers/bookController')(null, nav);

    // Middleware for all call books or books/id
    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getAll);

    bookRouter.route('/:id')
        .get(bookController.getById);
    return bookRouter;
};
module.exports = router;