const express     = require('express');
const pug         = require('pug');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser')

const controllers = require('./controllers')
const db          = require('./models')
const Restaurant  = db.Restaurant;

const app         = express();

require('dotenv').config();

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.render('index')
})

app.get('/api/restaurants', controllers.restaurants.index);
app.post('/api/restaurants', controllers.restaurants.create);

var server = app.listen(process.env.PORT,() => console.log(`listening on ${process.env.PORT}`));
