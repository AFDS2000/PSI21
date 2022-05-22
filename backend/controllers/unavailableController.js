const { body, validationResult } = require('express-validator');

const Unavailable = require('../models/unavailable');

exports.addDay = [
    body('unavailableDay').trim().not().isEmpty(),
    body('hStart').trim().not().isEmpty().isBefore('hEnd'),
    body('hEnd').trim().not().isEmpty().isAfter('hStart'),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({ err: errors });
            return;
        }

        const unavailable = new Unavailable({
            unavailableDay: req.body.unavailableDay,
            hStart: req.body.hStart,
            hEnd: req.body.hEnd,
        }) 

        unavailable.save((err) => {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
            res.status(201).json({
                message: "Periodo de indisponibilidade criado com sucesso!"
            });
        })
    }
]