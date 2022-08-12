var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var AccountInfoSchema = new Schema({
  userId: Schema.Types.ObjectId,
  subscriptions: {
    personalSummary: {
      type: Boolean,
      default: true
    },
    webApp: {
      type: Boolean,
      default: true
    },
    community: {
      type: Boolean,
      default: true
    }
  },
  subscriptionFreq: {
    type: String,
    enum: ['monthly','weekly','daily'],
    default:'daily'
  },
  courses: [{
    _id: Schema.Types.ObjectId,
    isOwned: Boolean,
    lessonBookmark: Schema.Types.ObjectId,
    isComplete: Boolean
  }]
});

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  artistName: {
    type: String,
    required: false,
    unique: true
  },
  aliases: [{type: String}],
  projects: [{type: String}],
  mailingAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      zip: String,
  },
  phone: String,
  permissionLevel: {
    type: Array,
    default: ["free"],
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  }
};

module.exports.User = mongoose.model('User', UserSchema);
module.exports.AccountInfo = mongoose.model('AccountInfo', AccountInfoSchema);