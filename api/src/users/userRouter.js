var router = require('express').Router();
var auth = require('../../auth/auth');
const verifyUser = require('../../auth/auth').verifyUser;
//var logger = require('../../util/logger');
var userController = require('./userController');
//var auth = require('../../auth/auth');

// lock down the right routes :)
router.param('id', userController.paramsId);
router.param('userId', userController.paramsId);
router.param('courseId', userController.courseId);

router.route('/')
  .get(auth.decodeToken, userController.get)
  .post(userController.post)

router.route('/user-from-token')
  .get(auth.decodeToken, userController.getFromToken);


router.route('/login')
  .post(verifyUser, userController.login)

router.route('/account-info/:id')
  .get(auth.decodeToken, auth.authorizeSystemAdminOrSameUser, userController.getOneAccountInfo)
  .put(auth.decodeToken, userController.putAccountInfo)
  // .delete(userController.delete)

router.route('/:userId/course-info')
  .get(auth.decodeToken, auth.authorizeSystemAdminOrSameUser, userController.getUserCourseInfoByUserId)

router.route('/:userId/course-info/:courseId')
  .get(auth.decodeToken, auth.authorizeSystemAdminOrSameUser, userController.getOneUserCourseInfoByIds)
  // .put(auth.decodeToken, auth.authorizeSystemAdminOrSameUser, userController.putBookmark)
  .post(auth.decodeToken, auth.authorizeSystemAdminOrSameUser, userController.checkIfUserCourseInfoExists, userController.createUserCourseInfo)

router.route('/:id')
  .get(userController.getOne)
  .put(auth.decodeToken, auth.authorizeSystemAdminOrSameUser, userController.put)
  .delete(auth.decodeToken, auth.authorizeSystemAdminOrSameUser, userController.delete)

module.exports = router;