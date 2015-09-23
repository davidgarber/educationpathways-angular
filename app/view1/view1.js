'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', 'ODOEStudentSearchData', function($scope, ssd) {
    $scope.validSearchOptionValues = ssd.getValidSearchOptionValues();

    $scope.selectedSearchOptions = ssd.selectedSearchOptions;
    $scope.selectedSearchOptionsAsJSON = function() {
        return JSON.stringify($scope.selectedSearchOptions);
    }

    $scope.searchResults = ssd.searchResults;
    $scope.searchResultsAsJSON = function() {
        return JSON.stringify($scope.searchResults);
    }

    $scope.doSearch = function() {
        ssd.initiateSearch().then(function(searchResults) {
            $scope.searchResults = searchResults;
        });
    };

    $scope.doReset = function() {
        ssd.resetSelectedSearchOptions();
        ssd.resetSearchResults();
        $scope.searchResults = ssd.searchResults;
    }

}]);