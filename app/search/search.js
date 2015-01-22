'use strict';

angular.module('myApp.search', ['ngRoute', 'ngResource', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/search', {
        templateUrl: 'search/search_movies.html',
        controller: 'SearchCtrl'
    });
}]);


angular.module('myApp.search').controller('SearchCtrl', ['$scope', 'moviesService', function($scope, moviesService) {
    $scope.currentPage = 1;
    $scope.currentReviewPage = 1;
    $scope.showDetails = false;
    $scope.showAlert = false;

    //Search for movies
    $scope.searchMovies = function() {
        if($scope.search === undefined) {
            $scope.showAlert = true;
        }
        else {
            $scope.showAlert = false;
            moviesService.search($scope.search, $scope.currentPage).get(function(data) {
                data.results.forEach(function(key, val) {
                    if(key.poster_path == null) {
                        key.poster_path = '../../assets/img/default_poster.png';
                    } else {
                        key.poster_path = 'http://image.tmdb.org/t/p/w500'+key.poster_path;
                    }
                });

                $scope.movies = data.results;
                $scope.totalItems = data.total_results;
                $scope.currentPage = data.page;
            });
        }
    };
    
    //Change page on the movie list
    $scope.changePage = function() {
        moviesService.search($scope.search, $scope.currentPage).get(function(data) {
            data.results.forEach(function(key, val) {
                if(key.poster_path === null) {
                    key.poster_path = '../../assets/img/default_poster.png';
                } else {
                    key.poster_path = 'http://image.tmdb.org/t/p/w500'+key.poster_path;
                }
            });

            $scope.movies = data.results;
        });
    };
    
    //Get movie details on click
    $scope.getDetails = function(movieId) {
        moviesService.getMovie(movieId).get(function(data) {
            $scope.movieDetails = data;
            if($scope.movieDetails.poster_path === null) {
                $scope.movieDetails.poster_path = '../../assets/img/default_poster.png';
            } else {
                $scope.movieDetails.poster_path = 'http://image.tmdb.org/t/p/w500'+$scope.movieDetails.poster_path;
            }
        }).$promise.then(function(data) {//Get movie reviews
            return moviesService.getMovieReviews(movieId, $scope.currentReviewPage).get(function(data) {
                $scope.movieReviews = data;
                $scope.currentReviewPage = 1;
                $scope.showDetails = true;
            }).$promise;
        });
    };

    //Change page on the reviews of the movie
    $scope.changeReviewPage = function(movieId) {
        moviesService.getMovieReviews(movieId, $scope.currentReviewPage).get(function(data) {
            $scope.movieReviews = data;
            $scope.currentReviewPage = data.page;
        });
    }

    //Back to list btn
    $scope.goBack = function() {
        $scope.showDetails = false;
    };
    
    //Close alert
    $scope.closeAlert = function() {
        $scope.showAlert = false;
    }
}]);