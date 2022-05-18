
const express = require('express');
const endpoints = require('../data/endpoints.json');
const endpointViewRouter = express.Router();

endpointViewRouter.route('/')
    .get((req, res) => res.render('endpoints', {
        endpoints
    }))

endpointViewRouter.route('/:url')
    .get((req, res) => res.render('endpoint', {
        endpoints: endpoints,
        url: req.params.url
    }));

module.exports = endpointViewRouter;