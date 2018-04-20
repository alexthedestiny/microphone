'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 5000;
const url = 'mongodb://admin:admin@ds251819.mlab.com:51819/logdb';
var app = module.exports = express();

// serve static files
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile('index.html');
  res.sendStatus(200);
});

app.post('/log', function(req, res){
	MongoClient.connect(url, function(err, db) {
	  	if (err) throw err;
	  	var log = db.collection("log");
	  	var logItem = req.body;
	  	log.insertOne(logItem, function(err, result){
	        if(err){ 
	        	res.sendStatus(500);
	            return console.log(err);
	        }
	        res.sendStatus(200);
	        db.close();
	    });
	});
});

app.get('/log', function(req, res){
	MongoClient.connect(url, function(err, db) {
	  	if (err) throw err;
	  	var log = db.collection("log");
	  	log.find().toArray(function(err, results){
	  		 if(err){ 
	        	res.sendStatus(500);
	            return console.log(err);
	        }
	        var logInfo = results.reverse();
	        res.send(JSON.stringify(logInfo));
	        db.close();
	    });
	});
});

app.get('/clearlog', function(req, res){
	MongoClient.connect(url, function(err, db) {
	  	if (err) throw err;
	  	var log = db.collection("log");
		log.drop(function(err, result){
			if(err){ 
	        	res.sendStatus(500);
	            return console.log(err);
	        }
		    res.send('<center><h2>logs successfully cleared</h2></center>');      
		    console.log(result);
		    db.close();
		});
	});
});

if (!module.parent) {
  app.listen(PORT);
  console.log('Express started on port 3000');
}
