var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var unavailableShema = new Schema({
    unavailableDay : { type: Date, required: true},
    hStart: {type: Date, required: true},
    hEnd: {type: Date, required:true}
});

module.exports = mongoose.model('Unavailable', unavailableShema);