/**
 * Created by bryoe on 9/17/2017.
 */
var mongoose = require('mongoose'),                    // mongoose for mongodb
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name : {type: String, required: true},
    members: {type: Object, required: true},
    createdAt: {type:Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now}
});

var Team = mongoose.model('Team', TeamSchema);

module.exports = Team;