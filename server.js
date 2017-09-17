
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var fs = require('fs');
var path = require('path');

// configuration =================

var connection = mongoose.createConnection('mongodb://localhost/walking-challenge');     // connect to mongoDB database on modulus.io


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


//models ==============================
console.log('\r\nAutoload Models and Routes..');
var autoLoadFolders = ['models', 'routes'];//load all controllers, models //  "models"
autoLoadFolders.forEach(function (folder) {
    var normalizedPath = path.join(__dirname, `/walking-challenge/../app/${folder}`);
    fs.readdirSync(normalizedPath).forEach(function (file) {
        console.log(normalizedPath);
        console.log("require " + "./app/" + folder + "/" + file);
        if (folder == "routes") {
            require("./app/" + folder + "/" + file);//anonymous function used for less boilerplate code
        } else {
            require("./app/" + folder + "/" + file);
        }
    })
});






//show the home screen
app.get('/', function(req, res){
    res.sendfile('./public/index.html');
});

//show admin
app.get('/admin', function(req, res){
    res.sendfile('./public/admin/admin.html');
});

app.get('/login', function(req, res){
    res.sendfile('./public/login.html')
});







// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");