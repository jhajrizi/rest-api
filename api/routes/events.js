const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /events'
  });
});

router.get('/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST requests to /events'
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