function testService($http) {
    this.get = function() {
        return $http.get('http://test-routes.herokuapp.com/test/hello')
            .then(function(res) {
                return res.data.message;
            });
    }

    this.uppercase = function(data) {
        return $http.post('http://test-routes.herokuapp.com/test/uppercase', data);
    }
}

function TestCtrl(testService) {
    var self = this;

    self.getMessage = function() {
        testService.get().then(function(message) {
            self.message = message;
        })
    }

    self.postData = function(message) {
        testService.uppercase({message: message})
            .success(function(body){
                self.sendMessage = body.message;
            });
    }
}

function testInterceptor() {
    return {
        request: function(config) {
            if(config.url.indexOf('http://test-routes.herokuapp.com') > -1) {
                config.headers['x-csrf-token'] = 'lalalalala';
            }
            return config;
        },
        requestError: function(config) {
            return config;
        },
        response: function(res) {
            return res;
        },
        responseError: function(res) {
            return res;
        }
    }
}

angular.module("app", [])
.factory('testInterceptor', testInterceptor)
.config(function($httpProvider) {
    $httpProvider.interceptors.push('testInterceptor')
})
.run(function($http) {
  $http.get('http://test-routes.herokuapp.com/test/hello')
    .then(function(res) {
      console.log(res.data.message)
    })
})
.service('testService', testService)
.controller('TestCtrl', TestCtrl);