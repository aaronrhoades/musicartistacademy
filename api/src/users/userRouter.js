var router = require('express').Router();
var signToken = require('../../auth/auth').signToken;
const verifyUser = require('../../auth/auth').verifyUser;
//var logger = require('../../util/logger');
var userController = require('./userController');
//var auth = require('../../auth/auth');

// lock down the right routes :)
router.param('id', userController.params);

router.route('/')
  .get(userController.get)
  .post(userController.post)

router.route('/login')
  .post(verifyUser, userController.login)

router.route('/:id')
  .get(userController.getOne)
  .put(userController.put)
  .delete(userController.delete)

module.exports = router;