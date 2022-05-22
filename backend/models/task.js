var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: { type: 'string', required: true, unique: true },
    level: { type: 'string', enum: ['urgente', 'alta', 'média', 'baixa'], required: true },
    percentageConclusion: { type: Number, required: true },
    users: { type: [Schema.ObjectId], required: true },
    tsStart: { type: Number, required: false },
    tsEnd: { type: Number, required: false }
});

module.exports = mongoose.model('Task', taskSchema);