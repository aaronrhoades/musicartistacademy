var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  body: {
    type: String,
    required: true,
    default: ''
  },
  homework: {
    type: String,
    required: false,
    default: ''
  },
  exercise: {
    type: String,
    required: false,
    default: ''
  },
  teacherIds: [Schema.Types.ObjectId],
  featureImageUrl: String,
  videoUrl: String,
});

module.exports = mongoose.model('lesson', LessonSchema);