const { body, validationResult } = require('express-validator');


const Reuniao = require('../models/reuniao');

exports.criarReuniao = [
   
    (req, res, next) => {
        console.log(req.body)
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