var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: { type: 'string', required: true, unique: true },
    users: { type: [Schema.ObjectId], ref: 'User', required: false }
    //
});

module.exports = mongoose.model('Team', teamSchema);