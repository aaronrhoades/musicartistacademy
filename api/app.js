const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const app = express();
const endpointViewRouter = require('./src/routers/entpointViewRouter')


const port = process.env.port;


app.use(morgan('tiny')); // less details
// app.use(morgan('combined')); // more details

app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome to Music Artist Academy', data: ['a', 'b', 'c']})
});



app.use('/endpoints', endpointViewRouter);

app.listen(port, () => {
    debug(`listening on port: ${port ? chalk.green(port) : chalk.red(port)}`);
});