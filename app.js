const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import Redis
const connectToRedis = require('./redis/redis').connectToRedis;
// Import Mongoose file.
const connectToMongo = require('./mongoose-connect/mongoose-connection').connectToMongo;

// Include config file 
if (process.env.NODE_ENV == 'production') {
  require('dotenv').config({
    path: 'config/prod.env'
  })
} else {
  require('dotenv').config({
    path: 'config/.env'
  })
}

// Connect to MongoDB
   connectToMongo();

  // Connect to redis
  // connectToRedis();

// Create application object
const app = express();

// Secure Http
function requireHttps(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.get('host') + req.url);
  }

  next()
}

if (process.env.NODE_ENV == 'production') {
  app.use(requireHttps);

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    res.setHeader('Content-Type', 'application/json');
    next();
  })
}

// Logger
app.use(logger('dev'));

// Body barser
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Include routing
require('./routes')(app)

// Create error object
app.use((req, res, next) => {
  let error = new Error('Not Found');
  err.status = 500;
  next(error)
});

// Error handling middleware
app.use((err, req, res, next) => {
  let error = err.message;
  res.status = err.status || 500;
  res.json(error);
  next();
})

if (process.env.NODE_ENV == 'production') {
  const http = require('https')
} else {
  const http = require('http');
  let port = process.env.PORT || 3000;
  let server = http.createServer(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ?
      'Pipe ' + port :
      'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  // 

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
      'pipe ' + addr :
      'port ' + addr.port;
    console.log('Listening on ' + bind);
  }
}