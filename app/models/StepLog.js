/**
 * Created by bryoe on 9/17/2017.
 */
var mongoose = require('mongoose'),                    // mongoose for mongodb
    Schema = mongoose.Schema;

//collect the steps for a user based on username
var StepLogSchema = new Schema({
    username: String,
    steps: Number,
    team: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

var StepLog = mongoose.model('StepLog', StepLogSchema)

module.exports = StepLog;