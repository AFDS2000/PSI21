const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    User.find({ "name": { "$regex": req.query.name, "$options": "i" } })
        .sort([['name', 'ascending']])
        .exec((err, users) => {
            if (err) return next(err);
            res.json(users)
        });
}

exports.getUser = (req, res, next) => {
    User.findById(req.params.id).exec((err, user) => {
        if (err) return next(err);
        res.status(200).json(user);
    });
}