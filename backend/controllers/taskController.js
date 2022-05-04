const { body, validationResult  } = require('express-validator');

const Task = require('../models/task');


exports.all = (req, res, next) => {
    Task.find().populate('users')
        .sort([['name', 'ascending']])
        .exec((err, tasks) => {
            if(err) return next(err);

            res.json(tasks);
        });
};

exports.add = (req,res,next) => {
    var express = require('express');
    var tasks = [];
    var app = express(); 

    app.use(express.json());

    var task = new Task({ name: req.body.name,level:req.body.level, percentageConclusion: req.body.percentageConclusion, users:req.body.users });
       
    task.save((err) => {});
    console.log(task);
    res.json( task  );
  };

  exports.delete = function(req,res,next){

    Task.findByIdAndDelete(req.params.id,{},function (err,thehero) {
      if (err) { return next(err); }
      });

      res.json();
  };