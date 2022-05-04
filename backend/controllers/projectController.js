const {body, validationResult } = require('express-validator');

var Project = require('../models/project');

exports.getProject = (req, res, next) => {
    Project.find().sort([
        ['name', 'ascending']
    ]).exec((err, projects)=>{
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

    (req, res, next) => {
       // console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({
                err: errors
            });
            return;
        }

       
        const project = new Project({
            name: req.body.name,
            alias: req.body.alias,
            startDate: req.body.startDate,
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