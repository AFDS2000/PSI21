var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);