var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReuniaoSchema = new Schema({
    type: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    users: { type: [Schema.ObjectId], ref: 'User', required: false }
});

module.exports = mongoose.model('Reuniao', ReuniaoSchema);