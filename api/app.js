const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const config = require('./config/config.json');
const port = config.server.port;
const userRouter = require('./src/users/userRouter');
const courseRouter = require('./src/courses/courseRouter');
const lessonRouter = require('./src/lessons/lessonRouter');
const auth = require('./auth/auth');

require('mongoose').connect(config.db.url, {dbName: config.db.name});
// CORS
const corsOptions = {
  origin: config.server.allowedOrigins,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use('/resources', express.static(__dirname +  '/resources'));

app.use(express.json());
app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/lessons', lessonRouter);



// For static files in the /public/ folder
app.use(express.static(path.join(__dirname, '/public/')));

app.listen(port, () => {
    console.log('listening on port ' + port)
});