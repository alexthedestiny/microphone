var express = require('express');
var path = require('path');
const PORT = process.env.PORT || 5000;

var app = module.exports = express();

// serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', function(req, res) {
  res.sendFile('index.html');
  res.sendStatus(200);
});

if (!module.parent) {
  app.listen(PORT);
  console.log('Express started on port 3000');
}
