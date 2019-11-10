require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(`'${process.env.DB_URL}'`,  {useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var Restaurant = require('./restaurant')

module.exports = {
  Restaurant: Restaurant,
}
