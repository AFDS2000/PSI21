const { body, validationResult } = require('express-validator');

const Task = require('../models/task');

exports.all = (req, res, next) => {
    Task.find().populate('users')
        .sort([['name', 'ascending']])
        .exec((error, tasks) => {
            if (error) return next(error);
            res.status(200).json(tasks);
        });
};

exports.add = [
    body('name').trim().matches(/^[a-zA-Z0-9 ]*$/).isLength({ min: 4 }),
    body('level').matches(/^alta|média|baixa|urgente$/),
    body('percentageConclusion').matches(/^[0]$/),
    body('users').isArray({ min: 1, max: 1 }),

    (req, res, next) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            res.json(error);
            return;
        }
        const task = new Task(
            {
                name: req.body.name,
                level: req.body.level,
                percentageConclusion:
                    req.body.percentageConclusion,
                users: req.body.users
            }
        );

        task.save((error, task) => {
            if (error) return next(error);
            res.status(201).json(task);
        });
    }
];

exports.delete = (req, res, next) => {
    Task.findByIdAndDelete(req.params.id, {}, function (error, thehero) {
        if (error) return next(error);
    });

    res.status(200).json();
};

exports.editUsers = async function (req, res, next) {
    const task = await Task.findOne({ '_id': req.params.id });

    task.users = req.body;
    
    task.save((error, task) => {
        if (error) return next(error);
        res.status(200).json(task);
    });
};

exports.getTaskUser = (req, res, next) => {
    Task.find({ users: req.params.id })
        .sort([['name', 'ascending']])
        .exec((error, tasks) => {
            if (error) return next(error);
            res.status(200).json(tasks);
        });
};

exports.updatePercentage = function (req, res, next) {
    console.log(req.body);

    Task.findByIdAndUpdate(req.body._id, { percentageConclusion: req.body.percentageConclusion }, {}, function (err) {
        if (err) {
             err.statusCode = 500;
            return next(err);
        }
    });
    res.status(201).json({
        message: "Projeto criado com sucesso!"
    });
    
};
