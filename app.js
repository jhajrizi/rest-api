const express = require('express');
const helmet = require('helmet');
const app = express();
const morgan = require('morgan');

const eventRoutes = require('./api/routes/events');

app.use(morgan('dev'));
app.use(helmet());

app.use('/events', eventRoutes);

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