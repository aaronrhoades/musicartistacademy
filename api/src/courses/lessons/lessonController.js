var Lesson = require('./lessonModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  Lesson.findById(id)
    .then(function(lesson) {
      if (!lesson) {
        next(new Error('No lesson with that id'));
      } else {
        req.lesson = lesson;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Lesson.find({})
    .then(function(lessons){
      res.json(lessons);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var lesson = req.lesson;
  res.json(lesson);
};

exports.put = function(req, res, next) {
  console.log(req.body);
  var lesson = req.lesson;

  var update = req.body;

  _.merge(lesson, update);

  lesson.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newLesson = new Lesson(req.body);

    newLesson.save(function(err, lesson) {
      if(err) {next(err);}

      res.json(lesson);
    });
};

exports.delete = function(req, res, next) {
  req.lesson.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};