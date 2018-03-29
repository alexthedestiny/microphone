var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('recognize');
  res.send('recognizer here');
  res.sendStatus(200);
});

module.exports = router;