var path = require('path');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/profile', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/profile.html');
});

app.get('/', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html');
});
/*
var availablePeople = [
  'luke',
  'leia',
  'rey',
  'finn',
  'r2d2'
];
*/
/* I will make this a code into our index code blog directly */
/* OR new pages about one project?? */
/*
app.get('/profile/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  if (availablePeople.indexOf(person) >= 0) {
    res.status(200).sendFile(
      __dirname + '/public/people/' + person + '.html'
    );
  } else {
    next();
  }
});
*/
app.get("*", function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port 3000");
});
