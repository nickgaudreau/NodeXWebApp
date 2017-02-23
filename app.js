var express = require('express');
var sql = require('mssql');
//ms sql config this a way and then pass into sql.connect(config, function(err){...})
var config = {
    user: 'NodeJs',
    password: 'Carlyto33',
    server: 'DELL\\SQLEXPRESS', // Azure or other hosted DB 'gpnju6fwr2.database.windows.net'. You can use 'localhost\\instance' to connect to named instance 
    database: 'LibraryNodeXWebApp',

    options: {
        //encrypt: true // Use this if you're on Windows Azure
    }
};
// ms sql connect - AND - Stay alive as context in node server to be use elsewhere
sql.connect('mssql://NodeJs:Carlyto33@DELL\\SQLEXPRESS/LibraryNodeXWebApp', function(err) {console.log('connect:'); console.log(err);});
//sql.connect(config, function(err) {console.log(err);});

//  express instance
var app = express();

// setup a port
var port = process.env.PORT || 8091; // if this does not return : process.env.PORT return 8091

// router
var bookRouter = express.Router();

/*
* app.use => set up middleware
* setup our static dir
*/
app.use(express.static('public')); // ex everytime a request is made for static file such as *.js or *.css, the server will look into that folder 1st

// access views
//app.use(express.static('src/views'));

// Set views templating ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

// nav here for now injeccted so we don't repeat for each route/view
var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];
// Set routes
var bookRouter = require('./src/routes/bookRoutesMsSql')(nav);

app.use('/Books', bookRouter);

// setup a handler for a route, when it hits the root
// param root, callback()
app.get('/',
    function(req, res) {
        // send => string of text
        //res.send('Node X app');

        // this is where we can render temaplting view  and pass in var or list ... or an array of objects!
        res.render('index',
            {
                title: 'Test EJS',
                nav: [{Link:'/Books', Name: 'Books'}, {Link:'/Authors', Name: 'Authors'}]
            }
        );
    });

app.get('/books',
    function(req, res) {
        // send => string of text
        res.send('book route');
    });

// Losten for connections: must listen to port and we''ll simply log on success listen to port
app.listen(port, function() {
    console.log('Gulp running app on PORT:' + port);
});

// TEst by typing node  app.js in shell/termnal/cmd/PS