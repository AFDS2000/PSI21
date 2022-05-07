const { body, validationResult } = require('express-validator');

const Team = require('../models/team');

//verificar que o utilizador que esta a fazer a criação da quipa é um administrador
exports.createTeam = [
    body('name').trim().isAlphanumeric().isLength({ min: 4 }),

    (req, res, next) => {

        const error = validationResult(req);

        if (!error.isEmpty()) {
            res.json(error);
            return;
        }

        const team = new Team(
            {
                name: req.body.name
            }
        );

        team.save((err) => {
            if (err) return next(err);
            res.status(201).json({
                message: "Equipa criada com sucesso!"
            });
        });
    }
];

exports.getTeams = (req, res, next) => {
    Team.find().populate('users')
        .sort([['name', 'ascending']])
        .exec((error, teams) => {
            if (error) return next(error);
            res.status(200).json(teams);
        });
};
