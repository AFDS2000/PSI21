const { body, validationResult } = require('express-validator');

const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.find()
        .sort([['name', 'ascending']])
        .exec((err, users) => {
            if (err) return next(err);

            res.json(users)
        })
}

exports.signup = [
    body('name').trim().isLength({ min: 3 }).withMessage('Introduza um nome válido'),
    body('password').trim().isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]/)
    .withMessage('A senha deve ter oito ou mais caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um algarismo'),
    body('type').trim().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json(errors);
            return;
        }

        const user = new User(
            {
                name: req.body.name,
                password: req.body.password,
                type: req.body.type
            }
        );

        user.save((err) => {
            if (err) {
                err.statusCode = 500;
                return next(err);
            }
            res.status(201).json({
                message: "Utilizador registado!"
            });
        })
    }
];