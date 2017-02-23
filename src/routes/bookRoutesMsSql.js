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
        .get(function (req, res) {
            //var id = req.params.id; // get url    /id
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            // then instead of callback function(err) as 2nd param
            ps.prepare(queryById).then(function() {
                ps.execute({id: req.params.id}).then(function(recordset) {
                    res.render('book-sql', { // render view name
                        title: 'Book',
                        nav: nav,
                        book: recordset[0] // sql still send back an array
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });
            }).catch(function(err) {
                console.log(err);
            });
        });
    return bookRouter;
};
module.exports = router;