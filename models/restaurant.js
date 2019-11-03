var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: String,
  address: String,
  type: String
});

var Restaurant = mongoose.model('Restuarant', RestaurantSchema);

module.exports = Restaurant;
