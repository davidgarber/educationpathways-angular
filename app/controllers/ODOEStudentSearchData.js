/**
 * Created by cvonsee on 9/19/15.
 */
myApp.service( 'ODOEStudentSearchData', [ 'ODOEStudentMetadata', function(smp) {
    /*
        BIG NOTE: There's an assumption here that the valid search option names shown here match the search option
         as exposed by the ODOEStudentMetadataProvider.  That class will take whatever properties are defined on
         the 'selectedSearchOptions' object and convert them into query params to send via the API.
     */
    var validSearchOptionNames = [ "gender", "ethnicity", "poverty", "lep", "meet_math", "meet_read", "district" ];
    var validSearchOptionValues = {
        gender: [],
            ethnicity: [],
            poverty: [],
            lep: [],
            meet_math: [],
            meet_read: [],
            district: []
    };

    validSearchOptionNames.forEach(function(vso, idx, arr) {
        smp.getMetadata(vso).then(function(returnedData) {
            for (var key in returnedData) {
                if (returnedData.hasOwnProperty(key))
                    validSearchOptionValues[vso].push( { id: key, name: returnedData[key] } );
            }
        })
    });

    this.getValidSearchOptionValues = function() {
        return validSearchOptionValues;
    };

    /*
     Selected search options, from the form
     */
    this.selectedSearchOptions = {
        gender: [],
        ethnicity: [],
        poverty: [],
        lep: [],
        meet_math: [],
        meet_read: [],
        district: []
    };

    this.resetSelectedSearchOptions = function() {
        var foo = this;
        validSearchOptionNames.forEach(function(val, idx, array) {
            foo.selectedSearchOptions[val] = [];
        })
    };

    this.selectedSearchOptionsAsJSON = function() {
        /*** This function gets called a WHOLE BUNCH OF TIMES by "view1".  Why??? ***/
        return JSON.stringify(this.selectedSearchOptions);
    };

    /*
        Search results
     */
    this.searchResults = {};

    this.initiateSearch = function() {
        return smp.search(this.selectedSearchOptions).then(function(searchResults) {
            this.searchResults = searchResults;
            return searchResults;
        });
    }

    this.resetSearchResults = function() {
        this.searchResults = {};
    }

    this.searchResultsAsJSON = function() {
        /*** This function gets called a WHOLE BUNCH OF TIMES by "view1".  Why??? ***/
        return JSON.stringify(this.searchResults);
    };

}]);