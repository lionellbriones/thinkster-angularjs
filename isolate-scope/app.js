angular.module("isolateApp", []);

angular.module("isolateApp").controller("ChoreCtrl", function($scope) {
    $scope.logChore = function(chore) {
        alert(chore + " is done!");
    }
})

angular.module("isolateApp").directive("kid", function() {
    return {
        restrict: "E",
        scope: {
            done: "&"
        },
        template: '<input type="text" ng-model="chore">' +
            '{{chore}}' +
            '<div class="button" ng-click="done({chore: chore})">I\'m done</div>'
    }
});

// @
angular.module("isolateApp").controller('AppCtrl', function($scope){
    $scope.ctrlFlavor = "blackberry";

    $scope.callHome = function callHome(message) {
        alert(message);
    }
});

angular.module("isolateApp")
.directive("drink", function() {
    return {
        scope: {
            flavor: "@"
        },
        template: '<div>{{flavor}}</div>'
    }
});

angular.module("isolateApp")
.directive("phone", function() {
    return {
        scope: {
            dial: "&"
        },
        template: '<input type="text" ng-model="value">' +
            '<div class="button" ng-click="dial({message: value})">' +
            'Call home!</div>'
    }
});