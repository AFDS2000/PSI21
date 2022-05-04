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

exports.add =[body('name').trim().matches(/^[a-zA-Z0-9 ]*$/).isLength({ min: 4 }),
              body('level').matches(/^alta|média|baixa|urgente$/),
              body('percentageConclusion').matches(/^[0]$/),
              body('users').isArray({min:1,max:1}),

(req,res,next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    
      res.json(errors);
      return;
  } 
    var task = new Task({ name: req.body.name,level:req.body.level, percentageConclusion: req.body.percentageConclusion, users:req.body.users });
    task.save((err) => {});
    res.json( task  );
  }
];
  
exports.delete = function(req,res,next){
  Task.findByIdAndDelete(req.params.id,{},function (err,thehero) {
    if (err) { return next(err); }
    });
    res.json();     
};
  