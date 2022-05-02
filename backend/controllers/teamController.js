const { body , validationResult, check  } = require('express-validator');

const Team = require('../models/team');

exports.createTeam = [
    body('name').trim().isAlphanumeric().isLength({min:4}),

    (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.json({err: errors});
            return;
        }

        const team = new Team(
            {
                name: req.body.name
            }
        );

        team.save( (err)  => {
            if(err) { 
                err.statusCode = 500;
                return next(err);
            }
            res.status(201).json({
                message: "Grupo criado com sucesso!"
            });
        });
    }
];