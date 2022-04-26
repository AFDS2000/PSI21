var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {type: String, required: true},
    alias: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: false},
    tasks: {type: [Schema.ObjectId], required: false}
});

module.exports = mongoose.model('Project', ProjectSchema);