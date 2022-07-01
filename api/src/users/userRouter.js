var router = require('express').Router();
var auth = require('../../auth/auth');
const verifyUser = require('../../auth/auth').verifyUser;
//var logger = require('../../util/logger');
var userController = require('./userController');
//var auth = require('../../auth/auth');

// lock down the right routes :)
router.param('id', userController.paramsId);

router.route('/')
  .get(auth.decodeToken, userController.get)
  .post(userController.post)

router.route('/user-from-token')
  .get(auth.decodeToken, userController.getFromToken);


router.route('/login')
  .post(verifyUser, userController.login)

router.route('/account-info/:id')
  .get(auth.decodeToken, auth.authorizeSystemAdmin, userController.getOneAccountInfo)
  .put(auth.decodeToken, userController.putAccountInfo)
  // .delete(userController.delete)

router.route('/:id')
  .get(userController.getOne)
  .put(userController.put)
  .delete(userController.delete)


module.exports = router;