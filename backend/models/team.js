var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: {type: 'string', required: true, unique: true},
    //users: {type: [Schema.ObjectId], required: false}
});

module.exports = mongoose.model('Team', teamSchema);