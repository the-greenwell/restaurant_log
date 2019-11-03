var db = require('../models');

function index(req,res){
  db.Restaurant.find({}, function(err,restaurants) {
    if (err) { console.log('error',err) }
    res.json(restaurants)
  });
}

function create(req,res){

  var restaurant = new db.Restaurant({
    name: req.body.restaurantName,
    address: req.body.restaurantAddy,
    type: req.body.restaurantType
  })

  restaurant.save(function(err,savedRestaurant){
    if (err) { console.log(err) }
    db.Restaurant.findOne(savedRestaurant, function(err,newRestaurant){
      if (err) { console.log('error -> ', err) }
      res.json(newRestaurant)
    })

  })

}

module.exports = {
  index:index,
  create:create,
}
