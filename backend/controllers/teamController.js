const { body , validationResult, check  } = require('express-validator');

const Team = require('../models/team');
const User = require('../models/user');



//verificar que o utilizador que esta a fazer a criação da quipa é um administrador
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

//operação para associar um utilizador a uma equipa
exports.addUsers = function(req, res, next) {
    
}

//operção para desassociar um utilizador de um equipa
exports.deleteUser = [

];