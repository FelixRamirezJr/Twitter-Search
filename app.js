var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var twitterSearch = require('./routes/twitter-search');

var app = express();

var Twitter = require('node-twitter');


var twitterSearchClient = new Twitter.SearchClient(
    'S469Ee9w6ZOuetTCYxBSdgNcq',
    'OCvjh7QGW3Axw2WUrzuTJg3YKj44li8qb56zQC87DI8GVdUBEH',
    '4653419119-CJI5e5XVOr5ZLjOvJFHB3oaPqzS5MKZZjboTVap',
    'gvvcs6z7VEdjEsI8OmokIgEKB91EoisUa6bSoQtJHBaLd'
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// Create AJAX Requests in here...
app.get('/twitter-search', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  twitterSearchClient.search({'q': req.query.search, 'count': 100, "geocode": "39.8,-95.583068847656,2500km"}, function(error, result) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      if (error)
      {
          res.emd(JSON.stringify("Error"));
      }

      if (result)
      {
        res.end(JSON.stringify(result));
      }
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
