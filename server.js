const express = require('express');
const app     = express();
const pug     = require('pug');

require('dotenv').config();

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function(req,res){
  res.render('index')
})

var server = app.listen(process.env.PORT,() => console.log(`listening on ${process.env.PORT}`));
