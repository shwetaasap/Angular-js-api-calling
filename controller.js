var app = angular.module('restaurantApp');


//homecontrol
app.controller('homesCtrl', ['$scope', function ($scope) {
    $scope.cuisine = "Good Food,Good Mood!!";
}]);


//restaurantCtrl
app.controller('restaurantCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.restaurant = function (city) {
        $location.path('/restaurant-result/' + city);//getting city name and routing to restaurant-result control
    }
}]);


//RestaurantResultCtrl(getting result as cityname,entity,entityId,latitude,longitude  and routing to RestaurantResultCuisinesCtrl
app.controller('RestaurantResultCtrl', ['$scope', '$routeParams', '$location', 'getCity', function ($scope, $routeParams, $location, getCity) {
    //console.log($routeParams.result);
    var city = $routeParams.city;
    getCity.inputCity(city)
        .then(function (cityResults) {
            //console.log(cityResults);
            $scope.title=cityResults.data.location_suggestions[0].title;
            $scope.name =cityResults.data.location_suggestions[0].country_name;
            //$scope.arrayLocation = cityResults.data.location_suggestions;
            //for(let i =0 ; i < arrayLocation.length; i++){(for making array)
            //sessionStorage.x(cityResults.data.location_suggestions[i].entity_id);
            $scope.entity = cityResults.data.location_suggestions[0].entity_type;
            $scope.entityId = cityResults.data.location_suggestions[0].entity_id;
            $scope.cityId = cityResults.data.location_suggestions[0].city_id;
            $scope.latitude =cityResults.data.location_suggestions[0].latitude;
            $scope.longitude = cityResults.data.location_suggestions[0].longitude;
            //when button clicked then this function happens
            $scope.cuisines = function () {
                var cityId = $scope.cityId;
                var entityId = $scope.entityId;
                var entity = $scope.entity;
                var latitude = $scope.latitude;
                var longitude = $scope.longitude;
                $location.path('/restaurant-cuisines/' + entity + '/' + entityId + '/' + cityId + '/' + latitude + '/' + longitude);
            }
        });
}]);


//restaurantResultCuisinesCtrl(getting result as cuisine dropdown and selecting the cuisine then sending to final search  and routing to RestaurantAroundCtrl
app.controller('RestaurantResultCuisinesCtrl', ['$scope', '$routeParams','$location', 'getCuisines', function ($scope, $routeParams,$location, getCuisines) {
    var cityId = $routeParams.cityId;
    var latitude= $routeParams.latitude;
    var longitude = $routeParams.longitude;
    var entityId=$routeParams.entityId;
    var entity=$routeParams.entity;
    getCuisines.inputCuisines(cityId,latitude,longitude)
        .then(function (response) {
            $scope.cusineName = response.data.cuisines;
            $scope.restaurantsFinal = function(selectedCuisines) {
                var cuisines=selectedCuisines;
                $location.path('/restaurant-final/' + entity + '/' + entityId +  '/' + latitude + '/' + longitude + '/' + cuisines);
            };
        });
}]);

//RestaurantAroundCtrl(getting final result by getting all parameters from above controllers and passing here..
app.controller('RestaurantAroundCtrl', ['$scope', '$routeParams', 'getRestaurant', function ($scope, $routeParams, getRestaurant) {
    var latitude= $routeParams.latitude;
    var longitude = $routeParams.longitude;
    var entityId=$routeParams.entityId;
    var entity=$routeParams.entity;
    var cuisines = $routeParams.cuisines;
    getRestaurant.inputRestaurant(entity,entityId,latitude,longitude,cuisines)
        .then(function (result) {
            $scope.total = result.data.results_found;
            var array=result.data.restaurants;
            $scope.resultArray = array;
        });
}]);
