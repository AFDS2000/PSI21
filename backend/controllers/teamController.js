const { body, validationResult } = require('express-validator');
const team = require('../models/team');

const Team = require('../models/team');

exports.getTeams = (req, res, next) => {
    Team.find().
        populate('users').
        sort([['name', 'ascending']]).
        exec((err, teams) => {
            if (err) return next(err);
            res.json(teams);
        })
}

exports.getTeam = (req, res, next) => {
    Team.findById(req.params.id).
        populate('users').
        exec((err, team) => {
            if (err) return next(err);
            res.json(team);
        })
}

exports.createTeam = [
    body('name').trim().isAlphanumeric().isLength({ min: 4 }),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({ err: errors });
            return;
        }

        const team = new Team(
            {
                name: req.body.name
            }
        );

        team.save((err) => {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
            res.status(201).json({
                message: "Grupo criado com sucesso!"
            });
        });
    }
];

exports.addUserTeam = async (req, res, next) => {

    var team = await Team.findOne({ 'name': { '$regex': req.body.team.name, '$options': 'i' } });
    if(!team) {
        const error = new Error("Equipa não encontrada");
        error.statusCode = 401;
        return next(error);
    }

    for (let user of team.users) {
        if(user._id == req.body.user._id) {
            const error = new Error("Utilizador já existe na equipa");
            error.statusCode = 401;
            return next(error);
        }
    }

    team.users.push(req.body.user);
    team.save((err) => {
        if (err) {
            err.statusCode = 500;
            return next(err);
        }
        res.status(201).json(team);
    });
    
};

exports.deleteUser = (req, res) => {
    Team.findByIdAndUpdate(req.body._id, { users: req.body.users }, {}, function (err) {
        if (err) {
            err.statusCode = 500;
            return next(err);
        }
        res.status(200).json({ message: "Utilizador removido com sucesso!" });
    });
}