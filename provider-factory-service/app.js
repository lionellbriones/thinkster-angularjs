var module = angular.module("app", []);

module.config(function(myProviderProvider) {
    myProviderProvider.setValue('New Value');
})

module.provider("myProvider", function() {
    this.value = "My Value"

    this.setValue = function(newValue) {
        this.value = newValue;
    }

    this.$get = function() {
        console.log("myProvider $get called");
        return "myProvider " + this.value;
    }
});

function Person(name) {
    this.name = name;
}

module.factory("myFactory", function() {
    console.log("myFactory function called");
    return new Person("John");
});

module.service("myService", function() {
    console.log("myService function called");
    this.getValue = function() {
        return "My object value";
    }
});

module.controller("MyCtrl", function(myProvider, myFactory, myService) {
    // console.log("myProvider: ", myProvider);
    console.log("myFactory: ", myFactory.name);
    // console.log("myService: ", myService.getValue());
});

module.controller("MyCtrl2", function(myProvider, myFactory, myService) {
    // console.log("myProvider: ", myProvider);
    console.log("myFactory: ", myFactory.name);
    // console.log("myService: ", myService.getValue());
});