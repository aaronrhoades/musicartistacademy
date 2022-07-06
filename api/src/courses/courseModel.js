var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModuleSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  videoUrl: String,
  lessonIds: {
    type: [Schema.Types.ObjectId]
  }
});

var CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  body: {
    type: String
  },
  modules: [ModuleSchema],
  authorId: String,
  featureImageUrl: String,
  videoUrl: String
});


module.exports = mongoose.model('course', CourseSchema);