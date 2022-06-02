const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const config = require('./config/config.json');
const port = config.server.port;
const userRouter = require('./src/users/userRouter');
const auth = require('./auth/auth');

require('mongoose').connect(config.db.url, {dbName: config.db.name});
// CORS
const corsOptions = {
    origin: config.server.allowedOrigins,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRouter);


// For static files in the /public/ folder
app.use(express.static(path.join(__dirname, '/public/')));

app.listen(port, () => {
    console.log('listening on port ' + port)
});