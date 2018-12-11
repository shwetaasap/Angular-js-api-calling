var app = angular.module('restaurantApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'template/homes.html',
            controller: 'homesCtrl'

        })
        .when('/restaurant', {
            templateUrl: 'template/restaurant.html',
            controller: 'restaurantCtrl'
        })
        .when('/restaurant-result/:city', {
            templateUrl: 'template/restaurant-result.html',
            controller: 'RestaurantResultCtrl'
        })
        .when('/restaurant-cuisines/:entity/:entityId/:cityId/:latitude/:longitude', {
            templateUrl: 'template/restaurant-result-cuisines.html',
            controller: 'RestaurantResultCuisinesCtrl'
        }) 
        .when('/restaurant-final/:entityId/:entity/:latitude/:longitude/:cuisines', {
            templateUrl: 'template/restaurant-around.html',
            controller: 'RestaurantAroundCtrl'
        }) 
        
})


