var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOM = require('react-dom/server');
var request = require('request');

require('babel-core/register')({
    presets: ['es2015', 'react']
});

var Twitter = require('node-twitter');


var twitterSearchClient = new Twitter.SearchClient(
    'S469Ee9w6ZOuetTCYxBSdgNcq',
    'OCvjh7QGW3Axw2WUrzuTJg3YKj44li8qb56zQC87DI8GVdUBEH',
    '4653419119-CJI5e5XVOr5ZLjOvJFHB3oaPqzS5MKZZjboTVap',
    'gvvcs6z7VEdjEsI8OmokIgEKB91EoisUa6bSoQtJHBaLd'
);

/* GET home page. */
router.get('/twitter-search', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  twitterSearchClient.search({'q': res.body.search}, function(error, result) {
      if (error)
      {
          console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
          res.write(JSON.stringify(objToJson));
      }

      if (result)
      {
        console.log("About to return success");
        res.write(JSON.stringify(result));
      }
  });
});

module.exports = router;
