'use strict';

angular.module('myApp.search', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search_movies.html',
    controller: 'SearchCtrl'
  });
}]);


angular.module('myApp.search').controller('SearchCtrl', [function() {
    
}]);