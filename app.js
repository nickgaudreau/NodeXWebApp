var express = require('express');

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

// Set routes
var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];
var bookRouter = require('./src/routes/bookRoutes')(nav);

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