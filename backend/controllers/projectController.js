const { body, validationResult } = require('express-validator');

var Project = require('../models/project');

exports.getProject = (req, res, next) => {
    Project.find().sort([
        ['name', 'ascending']
    ]).exec((err, projects) => {
        if (err) return next(err);
        res.json(projects);
    })
}

exports.criarProjeto = [
    body('name').trim().not().isEmpty().isLength({
        min: 6
    }),
    body('alias').trim().isLength({
        min: 3,
        max: 3
    }),
    body('startDate').trim().not().isEmpty(),

    body('endDate').trim(),

    (req, res, next) => {
        // console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(errors);
        }


        const project = new Project({
            name: req.body.name,
            alias: req.body.alias,
            startDate: req.body.startDate,
            endDate: req.body.startDate,
        });

        project.save((err) => {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
            res.status(201).json({
                message: "Projeto criado com sucesso!"
            });
        })
    }

];

exports.updateTeam = function (req, res, next) {
    console.log(req.body.teams == null)
    if (req.body.teams == null) {
        Project.findByIdAndUpdate(req.body._id, { teams: null }, {}, function (err) {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
        });
        res.status(201).json({
            message: "Projeto criado com sucesso!"
        });

    } else {
        Project.findByIdAndUpdate(req.body._id, { teams: req.body.teams }, {}, function (err) {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
        });
        res.status(201).json({
            message: "Projeto criado com sucesso!"
        });
    }
};

exports.updateTasks = function (req, res, next) {
    console.log(req.body.tasks == null)
    if (req.body.tasks == null) {
        Project.findByIdAndUpdate(req.body._id, { tasks: null }, {}, function (err) {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
        });
        res.status(201).json({
            message: "Projeto criado com sucesso!"
        });

    } else {
        Project.findByIdAndUpdate(req.body._id, { tasks: req.body.tasks }, {}, function (err) {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
        });
        res.status(201).json({
            message: "Projeto criado com sucesso!"
        });
    }
};