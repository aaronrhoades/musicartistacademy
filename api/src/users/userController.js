const { User, AccountInfo, UserCourseInfo } = require('./userModel');
var Course = require('../courses/courseModel');
var mongoose = require('mongoose');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;
const config = require('../../config/config.json');

exports.paramsId = (req, res, next, id) => {
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

exports.courseId = (req, res, next, courseId) => {
  Course.findById(courseId)
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

exports.get = (req, res, next) => {
  User.find({})
    .then((users) => {
      users.forEach(user => {
        user.password = null;
      })
      res.json(users);
    }, (err) => {
      next(err);
    });
};

exports.getFromToken = (req, res, next) => {
  token = req.auth;
  if(token && token._id) {
    
    User.findById(token._id).then(user => {
      user.password = null;
      res.json(user);
    })
  } else {
    next(new Error('No token ID was found'))
  }
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

      var newAccount = new AccountInfo({userId: user._id});
      newAccount.save((err, accountInfo) => {
        if(err){next(err)}
      });

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

/*********************************
            Account Info
*********************************/

exports.getOneAccountInfo = (req, res, next) => {
  token = req.auth
  let requestId = req.params.id;
  
  //check for same user or admin (TODO reconfig and test auth.authorizeSystemAdmin.)
  if (token._id && (token._id === requestId))
  AccountInfo.findOne({userId: requestId})
    .then((accountInfo) => {
      console.log(accountInfo);
      if (!accountInfo) {
        next(new Error('Could not retrieve account info'));
      } else {
        console.log(accountInfo); 
        res.json(accountInfo);
      }
    }, (err) => {
      next(err);
    });
};

exports.putAccountInfo = (req, res, next) => {
  var user = req.user;
  var update = req.body;
  AccountInfo.findOneAndUpdate({userId: user._id}, update).then(accInfo => {
    res.json(accInfo)
  })
};

/*********************************
            Bookmarks
*********************************/

exports.checkIfUserCourseInfoExists = (req, res, next) => {
  var userId = req.params.userId;
  var courseId = req.params.courseId;
  console.log(courseId);

  UserCourseInfo.findOne({userId: userId, courseId: courseId}).then(ucInfo => {
    console.log(ucInfo);
    if(ucInfo) {
      next(new Error('User / course combination already exists'));
    } else {
      next();
    }
  })
}

exports.createUserCourseInfo = function(req, res, next) {
  var newUserCourseInfo = new UserCourseInfo(req.body);
  let courseId = req.params.courseId;
  let userId = req.user._id;
  let bookmark = newUserCourseInfo.bookmark;
  
  if(bookmark) {  
    let lessonId = bookmark.lessonId;
    bookmark.lessonId = new mongoose.Types.ObjectId(lessonId);
  };
  newUserCourseInfo.userId = new mongoose.Types.ObjectId(userId);
  newUserCourseInfo.courseId = new mongoose.Types.ObjectId(courseId)

  newUserCourseInfo.save((err, userCourseInfo) => {
    if(err) {next(err);}

    res.json(userCourseInfo);
  });
};

exports.getUserCourseInfoByUserId = (req, res, next) => {
  var user = req.user;

  UserCourseInfo.find({userId: user._id }).then(userCourseInfo => {
    res.json(userCourseInfo);
  });
}

exports.getOneUserCourseInfoByIds = (req, res, next) => {
  var userId = req.params.userId;
  var courseId = req.params.courseId;

  UserCourseInfo.findOne({userId: userId, courseId: courseId }).then(userCourseInfo => {
    res.json(userCourseInfo);
  });
}