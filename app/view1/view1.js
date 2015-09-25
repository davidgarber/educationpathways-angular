'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', 'ODOEStudentMetadata', function($scope, smd) {
    $scope.validSearchOptionValues = smd.getValidSearchOptionValues();

//    $scope.selectedSearchOptions = ssd.selectedSearchOptions;
    $scope.selectedSearchOptions = {};
    $scope.selectedSearchOptionsAsJSON = function() {
        return JSON.stringify($scope.selectedSearchOptions);
    }

//    $scope.searchResults = ssd.searchResults;
    $scope.searchResults = {};
    $scope.searchResultsAsJSON = function() {
        return JSON.stringify($scope.searchResults);
    }

    $scope.doSearch = function() {
        smd.search($scope.selectedSearchOptions).then(function(searchResults) {
            $scope.searchResults = searchResults;
        });
    };

    $scope.doReset = function() {
        $scope.selectedSearchOptions = {};
        $scope.searchResults = {};
    }

}]);