var express = require('express');
var sql = require('mssql'); /// alive contaxt from connect in app.js

var bookRouter = express.Router();

var queryAll = 'select * from book';
var queryById = 'select * from book where i_id =';

var router = function (nav) {

    bookRouter.route('/')
        .get(function (req, res) {

            var request = new sql.Request();

            // then instead of callback function(err, recordset) as 2nd param
            request.query(queryAll)
                .then(function (recordset) {
                    res.render('book-list', { // render view name
                        title: 'Books',
                        nav: nav,
                        books: recordset
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id; // get url    /id

            var request = new sql.Request();

            // then instead of callback function(err, recordset) as 2nd param
            request.query(queryById + id)
                .then(function (record) {
                    res.render('book', { // render view name
                        title: 'Book',
                        nav: nav,
                        book: record
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });

        });
    return bookRouter;
};
module.exports = router;