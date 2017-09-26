;(function (){
    angular.module("app", []);

    function authInterceptor(API, auth) {
        return {
            request: function(config) {
                return config;
            },
            response: function(res) {
                return res;
            }
        }
    }
    
    function authService($window) {
        var self = this;
    }

    function userService($http, API, auth) {
        var self = this;

        self.getQuote = function() {
            return $http.get(API + '/auth/quote');
        }

        self.register = function(username, password) {
            return $http.post(API + '/auth/register', {
                username: username,
                password: password
            });
        }

        self.login = function(username, password) {
            return $http.post(API + '/auth/login', {
                username: username,
                password: password
            });
        }
    }

    function MainCtrl(user, auth) {
        var self = this;

        function handleRequest(res) {
            var token = res.data ? res.data.token : null;
            if(token) {
                console.log('JWT:', token);
            }
            self.message = res.data.message;
        }

        self.login = function() {
            user.login(self.username, self.password)
                .then(handleRequest, handleRequest);
        }

        self.register = function() {
            user.register(self.username, self.password)
                .then(handleRequest, handleRequest);
        }

        self.getQuote = function() {
            user.getQuote()
                .then(handleRequest, handleRequest);
        }

        self.logout = function() {
            auth.logout && auth.logout();
        }

        self.isAuthed = function() {
            return auth.isAuthed ? auth.isAuthed() : false;
        }
    }
    
    angular.module("app")
    .factory('authInterceptor', authInterceptor)
    .service('user', userService)
    .service('auth', authService)
    .constant('API', 'http://test-routes.herokuapp.com')
    .config(function($httpProvider) {
        $httpProvider.inteceptors.push('authInterceptor');
    })
    .controller("MainCtrl", MainCtrl);
})();