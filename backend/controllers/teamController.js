const { body , validationResult  } = require('express-validator');

const Team = require('../models/team');

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

exports.getTeams = (req, res, next) => {
    Team.find().sort([
        ['name', 'ascending']
    ]).populate('users').exec((err, teams)=>{
        if (err) return next(err);
        res.json(teams);
    })
}

exports.getTeam = (req, res, next) => {
    Team.findById(req.params.id).populate('users').exec((err, team)=>{
        if (err) return next(err);
        res.json(team);
    })
}



exports.addUserTeam = function(req, res, next){  

    Team.findByIdAndUpdate(req.body._id, {users: req.body.users}, {}, function(err){
        if(err){
            err.statusCode = 500;
            return next(err);
        }
    });
    
};

exports.removeUser = (req, res) => {

}