var express = require('express');
var router = express.Router();
const pubsub = require('../utils/pubsub');
const config = require('../config/constants');
/** POST send message by body. */
router.post('/', async function (req, res, next) {
  const message = req.body.message;
  if (!message) return res.status(400).send('Message is required');
  await pubsub.publish(message, config.messageQueue);
  res.sendStatus(200);
});
/* GET send message by query. */
router.get('/', async function (req, res, next) {
  const message = req.query.message;
  // const message = req.body.message;
  if (!message) return res.status(400).send('Message is required');
  await pubsub.publish(message, config.messageQueue);
  res.sendStatus(200);
});

module.exports = router;
