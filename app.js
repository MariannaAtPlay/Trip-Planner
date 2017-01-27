var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var models = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
var env = nunjucks.configure('views', {noCache: true});

app.get('/', function (req, res) {
   res.send('hello world');
});

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('++++++Page Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  if (err.status === 404) {
  	res.send(err.message);
  } else {
  	res.send("some other error occured");
  }
  
});


models.db.sync({force: true})
    .then(function() {
        app.listen(3000, function(){
            console.log("server is listening on port 3000");
        });
    })
    .catch(console.error);
