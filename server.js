
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost/walking-challenge');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


//models ==============================

var UserSteps = mongoose.model('UserSteps', {
    name: String,
    steps: Number,
    team: String
});

//controllers ================================




//get all records in the userSteps table
app.get('/api/step-count', function(req, res){
   UserSteps.find(function(err, stepCount){
       if(err){
           res.send(err);
       }

       res.json(stepCount);
   })
});

//post an entry in the userSteps table
app.post('/api/step-count', function(req, res){
   UserSteps.create({
       name: req.body.name,
       steps: req.body.steps,
       team: req.body.team
   }, function(err, steps){

       if(err){
           res.send(err);
       }

       UserSteps.find(function(err, stepCount){
           if(err){
               res.send(err);
           }

           res.json(stepCount);
       })

   })
});

//update an existing user
app.patch('/api/step-count', function(req, res){
   UserSteps.findOneAndUpdate(
       {name: req.body.name, team:req.body.team},
       {steps: req.body.steps},
       {new: true},
       function(err, steps) {
           if (err) {
               res.send(err);
           }

           UserSteps.find(function (err, stepCount) {
               if (err) {
                   res.send(err);
               }

               res.json(stepCount);
           })
       })
});

//get a specific row per user
app.get('/api/step-count/:name', function(req, res){
    UserSteps.findOne({
        name: req.params.name
    }, function(err, name){
        if(err){
            res.send(err)
        }

        res.json(name);
    })
});

//show the home screen
app.get('/', function(req, res){
    res.sendfile('./public/index.html');
});



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");