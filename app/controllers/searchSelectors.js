/**
 * Created by cvonsee on 9/19/15.
 */

myApp.controller('SearchSelectorController', [ '$scope', 'ODOEStudentMetadata', 'ODOEStudentSearchData', function($scope, smp, ssd) {
    $scope.validSearchOptionValues = ssd.validSearchOptionValues;
    ssd.resetAllSearchOptions();

    ssd.validSearchOptionNames.forEach(function(vso, idx, arr) {
        smp.getMetadata(vso).then(function(returnedData) {
            for (var key in returnedData) {
                if (returnedData.hasOwnProperty(key))
                    ssd.addSearchOptionValue(vso, { id: key, name: returnedData[key] } );
            }
        })
    });

    $scope.selectedSearchOptions = ssd.selectedSearchOptions;
    ssd.resetSelectedSearchOptions();

    $scope.doSearch = function() {
        smp.search(ssd.selectedSearchOptions).then(function(searchResults) {
            ssd.searchResults = searchResults;
        });
    }

    $scope.doReset = function() {
        ssd.resetSelectedSearchOptions();
    }
}]);
