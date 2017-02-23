var express = require('express');
var sql = require('mssql'); /// alive contaxt from connect in app.js

var bookRouter = express.Router();

var queryAll = 'select * from book';
var queryById = 'select * from book where i_id = @id'; // @id using prepared statement

var router = function (nav) {

    bookRouter.route('/')
        .get(function (req, res) {

            var request = new sql.Request();

            // then instead of callback function(err, recordset) as 2nd param
            request.query(queryAll)
                .then(function (recordset) {
                    res.render('book-list-sql', { // render view name
                        title: 'Books',
                        nav: nav,
                        books: recordset
                    });
                })
                .catch(function (err) {
                    console.log('error request query');
                    console.log(err);
                });
        });

    bookRouter.route('/:id')
        // middleware for all books/id http verbs route
        .all(function(req, res, next) {
            //var id = req.params.id; // get url    /id
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            // then instead of callback function(err) as 2nd param
            ps.prepare(queryById).then(function() {
                ps.execute({id: req.params.id}).then(function(recordset) {
                    if (recordset.length === 0) {
                        res.status(404).send('Not Found'); // later would render 404 page
                    }
                    else {
                        req.data = recordset[0]; // list sent from server since we are using where...
                        next();// follow next normal request execution step
                    }
                })
                .catch(function(err) {
                    // render error page - most likely 500
                    console.log(err);
                });
            }).catch(function(err) {
                console.log(err);
            });
        })
        .get(function (req, res) {
            //var id = req.params.id; // get url    /id
            res.render('book-sql', { // render view name
                        title: 'Book',
                        nav: nav,
                        book: req.data
                    });
        });
    return bookRouter;
};
module.exports = router;