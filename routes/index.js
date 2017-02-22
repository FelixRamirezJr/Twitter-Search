var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOM = require('react-dom/server');
var request = require('request');

require('babel-core/register')({
    presets: ['es2015', 'react']
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
