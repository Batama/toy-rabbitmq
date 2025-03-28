var express = require('express');
var router = express.Router();
const db = require('../db/db');

/* GET renders chat screen. */
router.get('/', function (req, res, next) {
  const messages = db.retrieve();
  res.render('messages', { messages: messages.reverse() });
});
/* GET renders chat screen. */
router.get('/chats', function (req, res, next) {
  const messages = db.retrieve();
  res.render('partials/message', { messages: messages.reverse() });
});

/* GET messages as array. */
router.get('/api', function (req, res, next) {
  const messages = db.retrieve();
  res.send(messages.reverse());
});


module.exports = router;
