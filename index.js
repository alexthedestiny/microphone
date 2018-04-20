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
	  	console.log("Database connected");
	  	var log = db.collection("log");
	  	var logItem = req.body;
	  	log.insertOne(logItem, function(err, result){
	        if(err){ 
	        	res.sendStatus(500);
	            return console.log(err);
	        }
	        console.log('inserted');
	        res.sendStatus(200);
	        db.close();
	    });
	});
	// var arr = [];
	// if(!fs.existsSync('./log.json')){
	// 	fs.writeFile('./log.json', '[{"test":"value"}]', (err) => {
	// 		console.log("write");
	// 	});
	// }
	// fs.readFile('./log.json', 'utf8', function(err, contents) {
	//     arr = JSON.parse(contents);
	//     arr.unshift(req.body);
	//     var json = JSON.stringify(arr);
 //    	fs.writeFile('./log.json', json, (err) => {
	// 	    if (err) {
	// 	        console.error(err);
	// 	        res.sendStatus(500);
	// 	        return;
	// 	    };
	// 		res.sendStatus(200);
	// 	});
	// });
});

app.get('/log', function(req, res){
	MongoClient.connect(url, function(err, db) {
	  	if (err) throw err;
	  	console.log("Database connected log");
	  	var log = db.collection("log");
	  	log.find().toArray(function(err, results){
	  		 if(err){ 
	        	res.sendStatus(500);
	            return console.log(err);
	        }
	        console.log(results);
	        res.send(JSON.stringify(results));
	        db.close();
	    });
	});
	// fs.readFile('./log.json', 'utf8', function(err, contents) {
	// 	if(!err){
	// 		res.send(contents);
	// 	}else{
	// 		res.send('some error occured or log is empty');
	// 	}
	    
	// });
});

app.get('/clearlog', function(req, res){
	fs.writeFile('./log.json', '[{"test":"value"}]', (err) => {
	    if (err) {
	        console.error(err);
	        res.sendStatus(500);
	        return;
	    };
	});
	res.sendStatus(200);
});

if (!module.parent) {
  app.listen(PORT);
  console.log('Express started on port 3000');
}
