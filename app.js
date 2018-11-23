const express = require('express');
const helmet = require('helmet');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://jon:' 
  + process.env.MONGO_ATLAS_PW 
  + '@node-rest-events-shard-00-00-1fleo.mongodb.net:27017,node-rest-events-shard-00-01-1fleo.mongodb.net:27017,node-rest-events-shard-00-02-1fleo.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-events-shard-0&authSource=admin&retryWrites=true',
  { useNewUrlParser: true }
);

const eventRoutes = require('./api/routes/events');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
});

// Routes
app.use('/events', eventRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;