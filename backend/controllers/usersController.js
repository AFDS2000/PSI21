const { body, validationResult } = require('express-validator');
const User = require('../models/user');


exports.getUsers = (req, res, next) => {
    User.find()
        .sort([['name', 'ascending']])
        .exec((error, users) => {
            if (error) return next(error);
            users = users.map(u => ({_id: u._id, name: u.name, type: u.type}))

            res.status(200).json(users);
        });
};
