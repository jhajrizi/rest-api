const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('../models/event');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /events'
  });
});

router.get('/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  
});

router.post('/', (req, res, next) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    desc: req.body.desc
  });
  event
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  res.status(200).json({
    message: 'Handling POST requests to /events',
    createdEvent: event
  });
});

router.patch('/:eventId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated event'
  });
});

router.delete('/:eventId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted event'
  });
});

module.exports = router;