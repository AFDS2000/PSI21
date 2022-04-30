var Team = require('../models/team');
var async = require('async');

exports.teams_list = function(req, res, next) {

  Team.find({}, 'name')
  .populate('users')
    .exec(function (err, list_teams) {
      if (err) { return next(err); }
      console.log(list_teams);
      res.json(  list_teams );
    });
  
};