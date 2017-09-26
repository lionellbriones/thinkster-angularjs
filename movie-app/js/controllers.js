function MovieListController($scope, $state, $window, Movie) {
    // GET /api/movies
    $scope.movies = Movie.query();

    // DELETE /api/movies/:id
    $scope.deleteMovie = function(movie) {
        if(confirm('Really delete this?')) {
            movie.$delete(function() {
                $window.location.href = '';
            })
        }
    }
}

function MovieViewController($scope, $stateParams, Movie) {
    // GET /api/movies/:id
    $scope.movie = Movie.get({id: $stateParams.id});
}

function MovieCreateController($scope, $state, $stateParams, Movie) {
    $scope.movie = new Movie();

    $scope.addMovie = function() {
        $scope.movie.$save(function() {
            $state.go('movies');
        });
    }
}

function MovieEditController($scope, $state, $stateParams, Movie) {
    $scope.updateMovie = function() {
        $scope.movie.$update(function() {
            $state.go('movies');
        })
    }

    $scope.loadMovie = function() {
        $scope.movie = Movie.get({id: $stateParams.id});
    }

    $scope.loadMovie();
}

angular.module('movieApp.controllers', [])
.controller('MovieListController', MovieListController)
.controller('MovieViewController', MovieViewController)
.controller('MovieCreateController', MovieCreateController)
.controller('MovieEditController', MovieEditController);