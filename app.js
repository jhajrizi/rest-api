const express = require('express');
const app = express();

const eventRoutes = require('./api/routes/events');

app.use('/events', eventRoutes);

module.exports = app;