function CtrltoDirCtrl() {
    var self = this;

    self.start = function() {
        console.log("Fun times have been started!");
    }
}

angular.module('app', [])
    .controller('CtrltoDirCtrl', CtrltoDirCtrl)
    .directive('ctrlDirective', function() {
        return function(scope, element, attrs) {
            element.bind('mouseenter', function() {
                scope.$apply(attrs.ctrlDirective);
            })
        }
    });