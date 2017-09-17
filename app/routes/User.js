/**
 * Created by bryoe on 9/17/2017.
 */
var express = require('express');
var app = express();
var User = require('../models/User');

module.export = function(){

    //get all users
    app.get('/api/users', function(req, res){
        User.find(function(err, users){
            if(err) res.send(err);
            else res.json(users);
        })
    });

    //create a new user
    app.post('/api/users', function(req, res) {
        var user = new User();
        var formData = req.body;

        for (var prop in formData) {
            user.prop = formData[prop];
        }

        //this will use the hashing defined in the model
        user.save(function (err, success) {

            if (err) res.send(err);
            else res.json(`steps entered for ${req.body.username}`);

        })

    });
};

