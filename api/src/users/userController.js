var User = require('./userModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;
const config = require('../../config/config.json');

exports.params = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, (err) => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.json(users);
    }, (err) => {
      next(err);
    });
};

exports.getOne = (req, res, next) => {
  var user = req.user;
  res.json(user);
};

exports.put = (req, res, next) => {
  var user = req.user;

  var update = req.body;

  _.merge(user, update);

  user.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.login = (req, res) => {
  var user = req.user;
  var token = signToken(user._id, user.permissionLevel);
  res.json({idToken: token, expiresIn: config.jwt.expireTime});
}

//create new user
exports.post = (req, res, next) => {
  var newUser = new User(req.body);

  newUser.save((err, user) => {
    if(err) {next(err);}
    if(user) {
      var token = signToken(user._id, user.permissionLevel);
      res.json({idToken: token, expiresIn: config.jwt.expireTime});
    } else {
      res.status(500).send('Could not create user. A user may already exist with that email, or there was an unknown error on the server.');
      err = new Error('Could not create user');
      next(err);
    }
  });
};

exports.delete = (req, res, next) => {
  req.user.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};