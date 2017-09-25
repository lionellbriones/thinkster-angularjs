function CtrltoDirCtrl() {
    var self = this;

    self.start = function () {
        console.log("Fun times have been started!");
    }
}

angular.module('app', [])
    // Controller Directive communication
    .controller('CtrltoDirCtrl', CtrltoDirCtrl)
    .directive('ctrlDirective', function () {
        return function (scope, element, attrs) {
            element.bind('mouseenter', function () {
                scope.$apply(attrs.ctrlDirective);
            })
        }
    })
    // Directive Directive communication
    .directive('dirToDir', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: function ($scope) {
                $scope.words = [];

                this.sayHello = function () {
                    $scope.words.push('Hello');
                }

                this.sayHowdy = function () {
                    $scope.words.push('Howdy');
                }

                this.sayHi = function () {
                    $scope.words.push('Hi');
                }
            },
            link: function (scope, element) {
                element.bind('mouseenter', function () {
                    console.log(scope.words);
                });
            }
        }
    })
    .directive('hello', function () {
        return {
            require: 'dirToDir',
            link: function (scope, element, attrs, dirToDirCtrl) {
                dirToDirCtrl.sayHowdy();
            }
        }
    })
    .directive("howdy", function () {
        return {
            require: "dirToDir",
            link: function (scope, element, attrs, dirToDirCtrl) {
                dirToDirCtrl.sayHowdy();
            }
        };
    })
    .directive("hi", function () {
        return {
            require: "dirToDir",
            link: function (scope, element, attrs, dirToDirCtrl) {
                dirToDirCtrl.sayHi();
            }
        };
    });