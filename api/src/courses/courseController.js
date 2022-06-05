var Course = require('./courseModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  Course.findById(id)
    .then(function(course) {
      if (!course) {
        next(new Error('No course with that id'));
      } else {
        req.course = course;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Course.find({})
    .then(function(courses){
      res.json(courses);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var course = req.course;
  res.json(course);
};

exports.put = function(req, res, next) {
  console.log(req.body);
  var course = req.course;

  var update = req.body;

  _.merge(course, update);

  course.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newCourse = new Course(req.body);

    newCourse.save(function(err, course) {
      if(err) {next(err);}

      res.json(course);
    });
};

exports.delete = function(req, res, next) {
  req.course.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};