const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    User.find({ "name": { "$regex": req.query.name, "$options": "i" } })
        .sort([['name', 'ascending']])
        .exec((err, users) => {
            if (err) return next(err);
            res.json(users)
        });
}

exports.signup = [
    body('name').trim().isLength({ min: 3 }).withMessage('Introduza um nome válido'),
    body('password').trim().isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]/)
        .withMessage('A senha deve ter oito ou mais caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um algarismo'),
    body('type').trim().not().isEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json(errors);
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 12)

            const user = new User(
                {
                    name: req.body.name,
                    password: hashedPassword,
                    type: req.body.type
                }
            );

            user.save((err) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                res.status(201).json({
                    message: "Utilizador registado!"
                });
            })
        } catch (error) {
            if (!error.statusCode)
                error.statusCode = 500;
            next(error);
        }
    }
];

exports.login = async (req, res, next) => {
    const password = req.body.password;
    var user = new User(
        {
            name: req.body.name,
            password: null,
            type: null
        }
    );

    try {

        var user = await User.findOne({ 'name': { '$regex': req.body.name, '$options': 'i' } });

        if (!user) {
            const error = new Error("Nome ou senha incorretos");
            error.statusCode = 401;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            const error = new Error("Nome ou senha incorretos");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                id: user._id,
                nome: user.name,
                type: user.type
            },
            'secretfortoken',
            { expiresIn: '1h' }
        )

        res.status(200).json({ token: token, id: user._id, type: user.type });

    } catch (error) {
        if (!error.statusCode)
            error.statusCode = 500;
        next(error);
    }
}