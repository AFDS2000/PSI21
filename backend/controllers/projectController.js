var Project = require('../models/project');

exports.create_project_post = function (req, res, next) {

    var project = new Project({
        name: req.body.name,
        alias: req.body.alias,
        startDate: req.body.startDate,
    });

    project.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json(project);
    });
};