

var path = require('path');
var express = require('express');
var fs =require('fs')
var expressHandlebars = require('express-handlebars')
var app =express()


var port = process.env.PORT || 3087; //**CHANGE BEFORE YOU SUBMIT
var rawData = fs.readFileSync('./twitData.json')
var twitData = JSON.parse(rawData)

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

	app.get('/twits', function (req, res) {
	  res.status(200).render('page', {
		  data: twitData, 
	  }); 
	});

	app.get('/twits/:twit', function (req, res){
    var twit = req.params.twit;
		var singleTwit = [];
		if((twit >= twitData.length) || (twit < 0)){ 
			res.status(404).render('404Page');
		}
		else{ 
			singleTwit.push(twitData[twit]); 
			res.status(200).render('page', {data: singleTwit, index: 0}); 
		}
	});

	

app.get('*', function (req, res) {
  res.status(404).render('404Page')
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
