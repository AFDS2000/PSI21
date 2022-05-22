const { body, validationResult } = require('express-validator');


const Reuniao = require('../models/reuniao');

exports.criarReuniao = [
    body('duration').trim().toInt().isDivisibleBy(30).withMessage('Deverá ser multiplo de 30'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(errors);
        }

        const reuniao = new Reuniao({
            type: req.body.type,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            duration: req.body.duration,
            users: req.body.users,
            hourStart: req.body.hourStart,

        });

        reuniao.save((err) => {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
            res.status(201).json({
                message: "Reuniao criado com sucesso!"
            });
        })
    }

];

exports.getMeetingsByUser = (req, res, next) => {
    Reuniao.find({ users: req.params.id })
        .exec((error, meetings) => {
            if (error) return next(error);
            res.status(200).json(meetings);
        });
}