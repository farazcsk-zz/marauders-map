'use strict';

var express = require('express'),
  router = express.Router(), // eslint-disable-line new-cap
  vcapServices = require('vcap_services'),
  extend = require('util')._extend,
  watson = require('watson-developer-cloud');

// another endpoint for the text to speech service

// For local development, replace username and password or set env properties
var ttsConfig = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/text-to-speech/api',
  username: process.env.TTS_USERNAME || '3848aad0-2cc8-4cc7-955b-1df55f942676',
  password: process.env.TTS_PASSWORD || 'F5FtDT5CZbol'
}, vcapServices.getCredentials('text_to_speech'));

var ttsAuthService = watson.authorization(ttsConfig);

router.get('/token', function(req, res) {
  ttsAuthService.getToken({url: ttsConfig.url}, function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      res.status(500).send('Error retrieving token');
      return;
    }
    res.send(token);
  });
});

module.exports = router;
