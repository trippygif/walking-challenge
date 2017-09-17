/**
 * Created by bryoe on 9/17/2017.
 */
var mongoose = require('mongoose'),                    // mongoose for mongodb
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');
    SALT_WORK_FACTOR = 10;


//build a schema to capture user information. password will be encrypted on save
var UserSchema = new Schema({
    username: {type: String, required: true, index: { unique: true}},
    password: {type: String, required: true },
    nameFirst: {type: String, required: true},
    nameLast: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

//before the save() function is executed, salt and has the password
//the method save() must be used on passwords to save appropriately with hashing
UserSchema.pre('save', function(next){
    var user = this;

    //only hash the password if it has been modified or new
    if(!user.isModified('password')) return next();

    //generate the salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        //hash the password with the new salt generated
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            //override the existing password (the one being submitted) with the hash
            user.password = hash;
            next()
        })
    })
});

//method to compare the password field. can extrapolate to helper service file to compare any type of field
UserSchema.methods.comparePassword = function(candidatePassword, callback){
    //compare the entered password (with encryption) to the one in the db
    bcrypt.compare(candidatePassword, this.password, function(err, match){
        if(err) return callback(err, null);
        return callback(null, match);
    })
}

//send to other files
module.exports = mongoose.model('User', UserSchema);