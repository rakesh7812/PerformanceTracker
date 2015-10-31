//modules
var express =  require('express');
var app =  express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require("morgan");
var cookieParser = require('cookie-parser');


//config files
var db = require('./app/config/db');
var config = require("./app/config/config");

//set port
var port = process.env.PORT || 8081;

//connec to db
mongoose.connect(db.url);

//set secret key
app.set('superSecret',config.secret);
//logging
app.use(morgan('dev'));
//get all data from body post param
//parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//cookie parser
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
// routes ==================================================
//require('./app/routes')(app); // configure our routes

app.get('/', function(req, res) {
  res.sendfile('./public/views/index.html'); // load our public/index.html file
});

var routes = require('./app/routes');

app.use('/api', routes);
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);
console.log('Application running at ' + port);

app.get('*', function(req, res) {
  res.sendfile('./public/views/index.html'); // load our public/index.html file
});

// expose app
exports = module.exports = app;
