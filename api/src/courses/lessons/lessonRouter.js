var router = require('express').Router();
//var logger = require('../../util/logger');
var lessonController = require('./lessonController');
var auth = require('../../../auth/auth');


// lock down the right routes :)
router.param('id', lessonController.params);

router.route('/')
  .get(lessonController.get)
  .post(auth.decodeToken, auth.authorizeTeacher, lessonController.post)

router.route('/:id')
  .get(lessonController.getOne)
  .put(auth.decodeToken, auth.authorizeTeacher, lessonController.put)
  .delete(lessonController.delete)

module.exports = router;