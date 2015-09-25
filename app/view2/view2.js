'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [ '$scope', '$q', '$document', 'ODOEStudentMetadata', function($scope, $q, $document, smd) {
        // Build an array of available search options and their display names
        $scope.searchOptions = [];
        smd.getSearchOptionNames().forEach( function(value, idx, array) {
            // don't allow charting of districts!
            if (value !== 'district')
                $scope.searchOptions.push( { optionName: value, optionDisplayName: smd.getSearchOptionDisplayName(value) } );
        });

        $scope.selectedOption = 'unknown';

        $scope.chartData = [];

        $scope.onOptionUpdated = function() {
            // start searches for each valid value for the selected option, and store the deferred promises in 'searches'
            var searches = [];
            smd.getValidSearchOptionValuesForOption($scope.selectedOption).forEach( function(value, idx, array) {
                var currSearchOptions = {};
                currSearchOptions[$scope.selectedOption] = value;

                searches.push(smd.search(currSearchOptions));
            });

            $q.all(searches)
                .then( function(deferredResults) {
                    $scope.chartData = [];

                    // First get the domain of all available path values so we can build the 'x' axis, and also the
                    // domain of bar labels.  Sort them in alphabetical order.
                    deferredResults.forEach( function(deferredValue, deferredValueIdx, deferredValueArray) {
                        var searchOptions = deferredValue['searchOptions'];
                        var searchResults = deferredValue['result'];

                        var chartDataGroup = {};
                        $scope.chartData.push(chartDataGroup);

                        // BEGIN HACK  I needed a way to get the search property value, so I read the first property
                        // of searchOptions (the search property name) and then get its first value. I know there's
                        // only one because we're searching for one property at a time.
                        var searchProperty = Object.keys(searchOptions)[0];
                        var searchPropertyValue = searchOptions[searchProperty][0];
                        // END HACK

                        chartDataGroup['key'] = smd.getValidSearchOptionDisplayNameForOptionValue(searchProperty, searchPropertyValue);
                        chartDataGroup['values'] = [];

                        var propName;
                        for (propName in searchResults) {
                            if (searchResults.hasOwnProperty(propName)) {
                                var chartDataItem = {};
                                chartDataItem['label'] = propName;
                                chartDataItem['value'] = searchResults[propName];
                                chartDataGroup['values'].push(chartDataItem);
                            }
                        }

                        d3.select('#chart1 svg').selectAll("*").remove();
                        nv.addGraph(function() {
                            var chart = nv.models.multiBarHorizontalChart()
                                .x(function(d) { return d.label })
                                .y(function(d) { return d.value })
                                .margin({top: 30, right: 20, bottom: 50, left: 175})
                                .showValues(true)
                                .tooltips(true)
                                .showControls(true);

                            chart.yAxis
                                .tickFormat(d3.format(',f'));

                            d3.select('#chart1 svg')
                                .datum($scope.chartData)
                                .transition().duration(500)
                                .call(chart);

                            nv.utils.windowResize(chart.update);

                            return chart;
                        });
                    });

                }, function(errorMessage) {
                    alert(errorMessage);
                });

        };
}]);