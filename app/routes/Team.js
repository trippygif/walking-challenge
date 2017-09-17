/**
 * Created by bryoe on 9/17/2017.
 */
var express = require('express');
var app = express();
var Team = require('../models/Team');

module.export = function(){

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

}