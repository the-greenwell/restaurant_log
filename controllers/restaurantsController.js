var db = require('../models');

var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  apiKey: 'AIzaSyDW_MWwghHDNNSb9uUukJ8XFZmhhezelFw'
}

var geocoder = NodeGeocoder(options);

function index(req,res){
  db.Restaurant.find({}, function(err,restaurants) {
    if (err) { console.log('error',err) }
    res.json({restaurants:restaurants})
  });
}

function create(req,res){
  geocoder.geocode(req.body.restaurantAddy, function(err, response) {
    var restaurant = new db.Restaurant({
      name: req.body.restaurantName,
      type: req.body.restaurantType,
      address: response[0].formattedAddress,
      latitude: response[0].latitude,
      longitude: response[0].longitude,
    })
    restaurant.save(function(err,savedRestaurant){
      if (err) { console.log(err) }
      db.Restaurant.findOne(savedRestaurant, function(err,newRestaurant){
        if (err) { console.log('error -> ', err) }
        res.json(newRestaurant)
      })
    })
  })
}

function destroy(req,res){
  db.Restaurant.findByIdAndRemove(req.params.restaurant_id, function(err, destroyedRestaurant){
    if (err) { console.log('delete-restaurant-uh-oh -> ', err) }
    res.json(destroyedRestaurant);
  })
}

module.exports = {
  index:index,
  create:create,
  destroy:destroy,
}
