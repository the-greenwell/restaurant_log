console.log('JavaScript is Running!')

var $restaurantList;
var allRestaurants = [];

$(document).ready(function(){

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $('#formModal').on('shown.bs.modal', function () {
    $('#restaurant-name').trigger('focus')
  })

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

  $restaurantList.on('click', '.deleteBtn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/restaurants/'+$(this).attr('data-id'),
      success: deleteRestaurantSuccess,
      error: deleteRestaurantError
    });
  });

});

var map;
var marker;
var placeSearch;
var autocomplete;
var base = {lat: 37.275274, lng: -121.843261};
var iconBase = '../images/';
var gmarker = [];

function initAll() {
  initMap();
  initAutocomplete();
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.332882, lng: -121.890146},
    zoom: 11,
    streetViewControl: false
  });
  marker = new google.maps.Marker({
    position: base,
    map: map,
    icon: iconBase + 'homePin.png',
  })
}

function initAutocomplete() {
  autocomplete= new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),{types:['geocode']});
  autocomplete.setFields(['address_component']);
}

function geolocate() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var circle = new google.maps.Circle(
        {center: base, radius: position.coords.accuracy});
    autocomplete.setBounds(circle.getBounds());
  });
}


function formatRestaurant(restaurant) {
  var restaurantPlot = new google.maps.Marker({
    position: {
      lat: restaurant.latitude,
      lng: restaurant.longitude
    },
    map: map,
    icon: iconBase + 'restaurantPin.png',
  });

  restaurantPlot.id = restaurant._id;
  gmarker.push(restaurantPlot);
  return`
    <div class='restaurant-show text-left' >
      <p class='restaurant-text'><small>Name:</small> <b>${restaurant.name}</b></p>
      <p class='restaurant-text'><small>Address:</small> <b>${restaurant.address}</b></p>
      <p class='restaurant-text'><small>Type:</small> <b><i>${restaurant.type}</i></b></p>
      <button type="button" name="button" class="deleteBtn btn btn-sm btn-danger btn-block" data-id=${restaurant._id}>Delete Restaurant</button>
    </div>
    <br/>`
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
  $('#formModal').modal('hide');
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
  for(var i = 0; i < allRestaurants.length; i++) {
    if(allRestaurants[i]._id === restaurantId) {
      allRestaurants.splice(i, 1);
      break;
    }
  }
  for(var j = 0; j < gmarker.length; j++) {
    if(gmarker[j].id === restaurantId) {
      gmarker[j].setMap(null);
    }
  }
  render();
}

function deleteRestaurantError(err) {
  console.log('delete-restaurant-uh-oh', err);
}
