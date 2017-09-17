/**
 * Created by bryoe on 9/17/2017.
 */
var express = require('express');
var app = express();
var StepLog = require('../models/StepLog');

module.exports = function(){

    //retrieve all steps
    app.get('/api/step-count', function(req, res){
        StepLog.find(function(err, steps){
            if(err) res.send(err)

            res.json(steps);
        })
    });

    //retrieve steps based on a username
    app.get('/api/steps/:username', function(req, next){
        StepLog.findOne({
            username: req.params.username
        }, function(err, steps){
            if(err) res.send(err)

            res.json(steps);
        })
    })


//post an entry in the userSteps table
    app.post('/api/step-count', function(req, res){
        StepLog.create({
            username: req.body.username,
            steps: req.body.steps,
            team: req.body.team,
            createdAt: req.body.created,
            updatedAt: req.body.updated
        }, function(err, steps){

            if(err){
                res.send(err);
            }

            StepLog.find(function(err, stepCount){
                if(err){
                    res.send(err);
                }

                res.json(stepCount);
            })

        })
    });

}
