var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    password: {type: String, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);