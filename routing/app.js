(function() {
    
    angular.module("app", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider.when("/:firstName/:middleName/:lastName",{
            templateUrl: "app.html",
            controller: "AppCtrl",
            controllerAs: "app"
        })
        .when('/cookies', {
            template: 'Nomnomonom'
        })
        .otherwise('/')
    })
    .controller("AppCtrl", function($routeParams) {
        var self = this;

        self.message = "Hi " + $routeParams.firstName + ' ' + $routeParams.middleName + ' ' + $routeParams.lastName;
    });
    
})()