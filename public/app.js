
var fs=require('fs');
const express = require('express');
const path = require('path');
var router = express.Router();
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('login.html', function(req,res) {
 
  data= res.render('login.html',  {name:"emma"},  function (err, data) {
  res.setHeader('Content-Type', 'text/html');
  res.send(data);
});
})


app.get('/login', function(req,res) {
  
  res.json({API_CAT: process.env.API_CAT, API_PET:process.env.API_PET, PET_SECRET: process.env.PET_SECRET})

});


app.get('signup.html', function(req,res) {
  data= fs.readFile('signup.html',   function (err, data) {
  res.setHeader('Content-Type', 'text/html');
  res.send(data);
});
})
app.get('gamepage.html', function(req,res) {
  data= fs.readFile('gamepage.html',   function (err, data) {
  res.setHeader('Content-Type', 'text/html');
  res.send(data);
});
})

 module.exports = router;
app.listen(port);
console.log('Server started at http://localhost:' + port);