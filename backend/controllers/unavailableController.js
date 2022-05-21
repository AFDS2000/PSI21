const { body, validationResult } = require('express-validator');

const Unavailable = require('../models/unavailable');


exports.getDays = (req, res, next) => {
    Unavailable.find(req).
    exec((err, us) => {
        if (err) return next(err);
        res.json(us);
    })

}

exports.addDay = [
    body('unavailableDay').trim().not().isEmpty().isAfter(Date.now),
    body('hStart').trim().not().isEmpty().isBefore('hEnd'),
    body('hEnd').trim().not().isEmpty().isAfter('hStart'),

    (req, res, next) => {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return next(errors);
        }

        const unavailable = new Unavailable({
            unavailableDay: req.body.unavailableDay,
            hStart: req.body.periods.hStart,
            hEnd: ree.body.periods.hEnd
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