;(function(window) {

angular.module('app', [])
.directive('tab', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: '<div role="tabpanel" ng-show="active" ng-transclude><div>',
        require: '^tabset',
        scope: {
            heading: '@'
        },
        link: function(scope, elem, attr, tabsetCtrl) {
            scope.active = false;

            scope.disabled = false;
            if(attr.disable) {
                attr.$observe('disable', function(value) {
                    console.log((value !== 'false'));
                    scope.disabled = (value !== 'false');
                })
            }

            tabsetCtrl.addTab(scope)
        }
    }
})
.directive('tabset', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            type: '@',
            justified: '@',
            vertical: '@'
        },
        templateUrl: 'tabset.html',
        bindToController: true,
        controllerAs: 'tabsetCtrl',
        controller: function() {
            var self = this;
            self.tabs = [];

            self.classes = {};
            if(self.type === 'pills') {
                self.classes['nav-pills'] = true;
            } else {
                self.classes['nav-tabs'] = true;
            }

            if(self.justified) { 
                self.classes['nav-justified'] = true;
            }

            if(self.vertical) { 
                self.classes['nav-stacked'] = true;
            }

            self.addTab = function addTab(tab) {
                self.tabs.push(tab);

                if(self.tabs.length === 1) {
                  tab.active = true
                }
            }

            self.select = function select(selectedTab) {
                if(selectedTab.disabled) return;

                angular.forEach(self.tabs, function(tab) {
                    if(tab.active && tab !== selectedTab) {
                        tab.active = false;
                    }

                    selectedTab.active = true;
                });
            }
        }
    }
});

})(window);