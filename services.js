var app = angular.module('restaurantApp');

 //restaurant-result url and init making own service getrestaurant and displaying data plus fetching data for getting cuisines..
app.factory('getCity',['$http', function($http){
    var restaurant ={
      inputCity: function(city) { 
       return  $http({
           method: 'GET',
           url: 'https://developers.zomato.com/api/v2.1/locations?query='+city,
           headers: {'user-key' : '7cf609e466747f6ce89968169c5b488c'},
})
  .then(function (data) {
        //console.log(data)
        return data;
    }) 
  }}
return restaurant;
}]);

//restaurant-cuisine url and init making own service getcuisines and displaying data plus fetching data for getting restaurants around you.)
app.factory('getCuisines',['$http', function($http){
    var restaurant ={
      inputCuisines: function(cityId,latitude,longitude) {
       return  $http({
           method: 'GET',
           url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id='+cityId+'&lat='+latitude+'&lon='+longitude,
           headers: {'user-key' : '7cf609e466747f6ce89968169c5b488c'},
})
  .then(function (data) {
       //console.log(data)
        return data;
    }) 
  }}
return restaurant;
}]);

//restaurant-around url and init making own service getcuisines and displaying data plus fetching data for getting restaurants around you.)
app.factory('getRestaurant',['$http', function($http){
    var finalResult ={
      inputRestaurant: function(entity,entityId,latitude,longitude,cuisines) {
       return  $http({
           method: 'GET',
           url: 'https://developers.zomato.com/api/v2.1/search?entity_type=' + entity + '&entity_id=' + entityId + '&lat=' + latitude + '&lon=' + longitude + '&cuisines=' + cuisines,
           headers: {'user-key' : '7cf609e466747f6ce89968169c5b488c'},
})
  .then(function (result) {
       //console.log(result)
        return result;
    }) 
  }}
return finalResult;
}]);
