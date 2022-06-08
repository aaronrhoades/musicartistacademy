var router = require('express').Router();
//var logger = require('../../util/logger');
var courseController = require('./courseController');
var auth = require('../../auth/auth');


// lock down the right routes :)
router.param('id', courseController.params);

router.route('/')
  .get(courseController.get)
  .post(auth.decodeToken, auth.authorizeTeacher, courseController.post)

router.route('/:id')
  .get(courseController.getOne)
  .put(auth.decodeToken, auth.authorizeTeacher, courseController.put)
  .delete(courseController.delete)

module.exports = router;