const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const nodeProxy = require('./node-proxy');
const nodeAppServer = require('./node-app-server');

/**
 * Heroku-friendly production http server.
 *
 * Serves your app and allows you to proxy APIs if needed.
 */

const app = express();
const PORT = process.env.PORT || 8080;

// Enable various security helpers.
app.use(helmet());

app.use('/api/speech-to-text/', require('../stt-token.js'));
app.use('/api/text-to-speech/', require('../tts-token.js'));

// API proxy logic: if you need to talk to a remote server from your client-side
// app you can proxy it though here by editing ./proxy-config.js
nodeProxy(app);

// Serve the distributed assets and allow HTML5 mode routing. NB: must be last.
nodeAppServer(app);

// Start up the server.
app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}`);
});

// chrome requires https to access the user's microphone unless it's a localhost url so
// this sets up a basic server at https://localhost3001/ using an included self-signed certificate
// note: this is not suitable for production use
// however bluemix automatically adds https support at http://<myapp>.mybluemix.net
var fs = require('fs'),
  https = require('https'),
  HTTPS_PORT = 3001;

var options = {
  key: fs.readFileSync(__dirname + '/../keys/localhost.pem'),
  cert: fs.readFileSync(__dirname + '/../keys/localhost.cert')
};
https.createServer(options, app).listen(HTTPS_PORT, function() {
  console.log('Secure server live at https://localhost:%s/', HTTPS_PORT);
});
