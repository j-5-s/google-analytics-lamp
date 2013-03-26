
/**
 * Module dependencies.
 */
var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , user = require('./routes/user')
  , http = require('http')
  , globals = require('./globals')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//middleware for denial of no local host
app.all('*', function(req,res,next){

  if (req.connection.remoteAddress !== '127.0.0.1') {
    res.render('access-denied', {});
  } else{
    next();
  }

});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/api/entries', api.entries);
app.get('/api/verify', api.verify);
app.get('/api/account', api.getAccount);
app.post('/api/account', api.account);
app.post('/api/toggle/:status', api.toggle);
app.post('/api/test/:r/:g', api.test);


//create an object that has access to all objects

var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});




http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
