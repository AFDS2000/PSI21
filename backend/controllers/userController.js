const { body, validationResult  } = require('express-validator');

const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.find()
        .sort([['name', 'ascending']])
        .exec((err, users) => {
            if(err) return next(err);

            res.json(users)
        })
}

exports.signup = [
    body('name').trim().not().isEmpty().withMessage('Introduza um nome válido'),
    body('email').isEmail().withMessage('Introduza um email válido')
    .normalizeEmail(),
    body('password').trim().isLength({ min: 6}),
    body('type').trim().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.json({err: errors});
            return;
        }

        const user = new User(
            { 
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                type: req.body.type
            }
        );

        user.save((err) => {
            if(err) { 
                err.statusCode = 500;
                return next(err);
            }
            res.status(201).json({
                message: "Utilizador registado!"
            });
        })
    }
];

