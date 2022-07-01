const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config.json');
const { User } = require('../src/users/userModel');
var fs = require("fs");

const RSA_PRIVATE_KEY = fs.readFileSync('auth/keys/jwtRS256.key');
const RSA_PUBLIC_KEY = fs.readFileSync('auth/keys/jwtRS256.key.pub');
const checkToken = expressJwt.expressjwt(
  {
    secret: RSA_PUBLIC_KEY,
    algorithms: ['RS256'] 
});

exports.decodeToken = (req, res, next) => {  
  // this will call next if token is valid
  // and send error if its not. It will attached
  // the decoded token to req.user
  checkToken(req, res, next);
};

exports.getFreshUser = function() {
  return function(req, res, next) {
    User.findById(req.user._id)
      .then(function(user) {
        if (!user) {
          // if no user is found it was not
          // it was a valid JWT but didn't decode
          // to a real user in our DB. Either the user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          res.status(401).send('Unauthorized');
        } else {
          // update req.user with fresh user from
          // stale token data
          user.password = null;
          req.user = user;
          next();
        }
      }, function(err) {
        next(err);
      });
  }
};

exports.verifyUser = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    // if no username or password then send
    if (!email || !password) {
      res.status(400).send('Username and password are required');
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    User.findOne({email: email})
      .then(function(user) {
        if (!user) {
          res.status(401).send('User not found. Please check to see if you have the correct email address');
        } else {
          // checking the passowords here
          if (!user.authenticate(password)) {
            res.status(401).send('Password is incorrect, please try again');
          } else {
            // if everything is good,
            // then attach to req.user
            // and call next so the controller
            // can sign a token from the req.user._id
            req.user = user;
            next();
          }
        }
      }, function(err) {
        next(err);
      });
};

// util method to sign tokens on signup
exports.signToken = function(id, permissionLevel) {
  return jwt.sign(
    { _id: id, permissionLevel: permissionLevel },
    RSA_PRIVATE_KEY,
    { expiresIn: config.jwt.expireTime, algorithm: 'RS256' }
  );
};

exports.authorizeTeacher = (req, res, next) => {
  let authId = req.auth._id;
  User.findOne({_id: authId}).then((user)=> {
    if(user.permissionLevel.includes('teacher') || user.permissionLevel.includes('system')) {
      next();
    } else {
      res.status(401).send('Teacher permissions not found');
    }
  });
}

//System admin OR Same User
exports.authorizeSystemAdmin = (req, res, next) => {
  let reqId = req.params.id;
  let authId = req.auth._id

  User.findOne({_id: authId}).then((user)=> {
    if(reqId === user._id.toString()) {
      //same user
      next();
    }
    else if(user.permissionLevel.includes('system')) {
      //admin
      next();
    } else {
      res.status(401).send('System admin permissions not found');
    }
  });
}