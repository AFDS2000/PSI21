const User = require('../models/user');

exports.searchUsers = (req, res, next) => {
    User.find({ "name": { "$regex": req.query.name, "$options": "i" } })
        .sort([['name', 'ascending']])
        .exec((err, users) => {
            if (err) return next(err);
            res.json(users)
        });
}

exports.getUsers = (req, res, next) => {
    User.find()
        .sort([['name', 'ascending']])
        .exec((error, users) => {
            if (error) return next(error);
            users = users.map(u => ({ _id: u._id, name: u.name, type: u.type }))

            res.status(200).json(users);
        });
};

exports.getUser = (req, res, next) => {
    User.findById(req.params.id).exec((err, user) => {
        if (err) return next(err);
        res.status(200).json(user);
    });
}