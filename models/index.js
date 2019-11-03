require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(`'${process.env.DB_URL}'`,  {useNewUrlParser: true });

var Restaurant = require('./restaurant')

module.exports = {
  Restaurant: Restaurant,
}
