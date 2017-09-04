
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

var connection = mongoose.createConnection('mongodb://localhost/walking-challenge');     // connect to mongoDB database on modulus.io

autoIncrement.initialize(connection);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


//models ==============================

var stepSchema = new Schema({
    name: String,
    steps: Number,
    team: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

stepSchema.plugin(autoIncrement.plugin, 'UserSteps');
var UserSteps = connection.model('UserSteps', stepSchema);

var userSchema = new Schema({
    username: String,
    name: String,
    team: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

userSchema.plugin(autoIncrement.plugin, 'Users');
var Users = connection.model('Users', userSchema);

var teamSchema = new Schema({
    number: {type: Number, default: 1},
    name : String,
    createdAt: {type:Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now}
});


teamSchema.plugin(autoIncrement.plugin, {
    model: 'Teams',
    field: 'number',
    startAt: 1,
    incrementBy: 1
});

var Teams = connection.model('Teams', teamSchema);
//controllers ================================

//get all users
app.get('/api/users', function(req, res){
    Users.find(function(err, users){
        if(err){
            res.send(err);
        }

        res.json(users);
    })
});

//create a new user
app.post('/api/users', function(req, res){
    Users.create({
        username: req.body.username,
        name: req.body.name,
        team: req.body.team,
        createdAt: req.body.created,
        updatedAt: req.body.updated
    }, function(err, users){

        Users.find(function(err, users){
            if(err){
                res.send(err);
            }

            res.json(users);
        })

    })
})



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
       team: req.body.team,
       createdAt: req.body.created,
       updatedAt: req.body.updated
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

//get all records per team
//get the drop down to pass value to this function and display
app.get('/api/teams/:team', function(req, res){
    UserSteps.find({
        team: req.params.team
    }, function(err, teams){
        if(err){
            res.send(err)
        }

        res.json(teams);
    })
});

//get all of the team names
app.get('/api/teams', function(req, res){
    Team.find().distinct('team', function(err, teams){
        if(err){
            res.send(err);
        }

        res.json(teams);
    })
});

//temp way to get teams based on user table
//will restructure every table
app.get('/api/teams-temp', function(req, res){
    /*
    Users.find().distinct('team', function(err, teams){
        console.log('anything?');
        if(err){
            res.send(err);
        }
        console.log(teams);
        res.json(teams);
    })*/
    Teams.find(function(err, teams){
        if(err){
            res.send(err);
        }

        res.json(teams);
    })
});

app.post('/api/teams-temp', function(req, res){
    Teams.create({
        number: req.body.number,
        name: req.body.name,
        createdAt: req.body.created,
        updatedAt: req.body.created
    }, function(err, success){

        if(err){
            res.send(err);
        }

        Teams.find(function(err, teams){

            if(err){
                res.send(err);
            }

            res.json(teams)

        })

    })
})

//show the home screen
app.get('/', function(req, res){
    res.sendfile('./public/index.html');
});

//show admin
app.get('/admin', function(req, res){
    res.sendfile('./public/admin.html');
})



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");