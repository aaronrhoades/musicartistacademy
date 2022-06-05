var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
    required: true
  },
  authorId: String,
  featureImageUrl: String,
  description: String
});


module.exports = mongoose.model('course', CourseSchema);