angular.module('myApp').factory("moviesService", ['$resource', function($resource) {
    return {
        getMovies: function(currentPage, type) {
            return $resource('http://api.themoviedb.org/3/movie/:type?api_key=:api_key&page=:page', 
                    {type: type, api_key:'64c7f60079db50fedb132e2ebe1b24e3', page: currentPage},                  
                    {query: { method: 'GET', isArray: false }
                });
        },
        getMovie: function(movieId) {
            return $resource('http://api.themoviedb.org/3/movie/:movieId?api_key=:apiKey', 
                    {movieId: movieId, apiKey:'64c7f60079db50fedb132e2ebe1b24e3' },                  
                    {query: { method: 'GET', isArray: false }
                });
        },
        getMovieReviews: function(movieId, page) {
            return $resource('http://api.themoviedb.org/3/movie/:movieId/reviews?api_key=:apiKey&page=:page', 
                    {movieId: movieId, apiKey:'64c7f60079db50fedb132e2ebe1b24e3', page:page },                  
                    {query: { method: 'GET', isArray: false }
                });
        },
        search: function(query, page) {
            return $resource('api.themoviedb.org/3/search/movie?api_key=:api_key&query=:query&page=:page', 
                    {query: query, apiKey:'64c7f60079db50fedb132e2ebe1b24e3', page:page },                  
                    {query: { method: 'GET', isArray: false }
                });
        }
    }
}]);