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
      $("#show-form").css("display","inline-block");
      $("#form-box").css("display","none");
  })

  $restaurantList.on('click', '.deleteBtn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/restaurants/'+$(this).attr('data-id'),
      success: deleteRestaurantSuccess,
      error: deleteRestaurantError
    });
  });

  $("#show-form").on('click', function(){
    $("#show-form").css("display","none");
    $("#form-box").css("display","block");
  })

  $("#close-form").on('click', function(e){
    e.preventDefault();
    $("#form-box").css("display","none");
    $("#show-form").css("display","inline-block");
  })

});

function formatRestaurant(restaurant) {
  return`
  <hr>
    <p>
      <b>${restaurant.name}</b>
      <br/>
      <small>${restaurant.address}</small>
      <br/>
      <small><i>${restaurant.type}</i></small>
      <br/>
      <br/>
      <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${restaurant._id}>Delete</button>
    </p>`
}

function formatAllRestaurants(restaurants){
  return restaurants.map(formatRestaurant).join("");
}

function render() {
  $restaurantList.empty();
  let restList = formatAllRestaurants(allRestaurants);
  $restaurantList.append(restList)
}

function handleSuccess(json) {
  allRestaurants = json.restaurants;
  render(allRestaurants);
}

function handleErr(err) {
  console.log('get-restaurants-uh-oh -> ', err)
}

function newRestaurantSucess(json) {
  $('#restaurant-form input').val('');
  allRestaurants.push(json);
  render();
}

function newRestaurantErr(err) {
  console.log('new-restaurant-uh-oh -> ', err)
}

function deleteRestaurantSuccess(json) {
  var restaurant = json;
  var restaurantId = restaurant._id;
  for(var index = 0; index < allRestaurants.length; index++) {
    if(allRestaurants[index]._id === restaurantId) {
      allRestaurants.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteRestaurantError(err) {
  console.log('delete-restaurant-uh-oh', err);
}
