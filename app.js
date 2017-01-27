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

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500).send(err.message)
});


models.db.sync({force: true})
    .then(function() {
        app.listen(3000, function(){
            console.log("server is listening on port 3000");
        });
    })
    .catch(console.error);
