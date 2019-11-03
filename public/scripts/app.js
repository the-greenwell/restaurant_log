console.log('JavaScript is Running!')
var $restaurantList;
var allRestaurants = [];

$(document).ready(function(){

  $restaurantList = $('#RestaurantTarget');

  $.ajax({
    method: 'GET',
    url: '/api/restaurants',
    success: handleSuccess,
    error: handleErr
  });

  $("#restaurant-form").on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/restaurants',
      data: $(this).serialize(),
      success: newRestaurantSucess,
      error: newRestaurantErr
    });
  })

});

function handleSuccess(json) {
  console.log(json);
}

function handleErr(err) {
  console.log('get-restaurants-uh-oh -> ', err)
}

function newRestaurantSucess(json) {
  $('#restaraunt-form input').val('');
  allRestaurants.push(json);
  console.log(allRestaurants);
}

function newRestaurantErr(err) {
  console.log('new-restaurant-uh-oh -> ', err)
}
