/**
 * Created by cvonsee on 9/19/15.
 */
myApp.factory( 'ODOEStudentSearchData', function() {
    return {
        validSearchOptionNames: [ "gender", "ethnicity", "poverty", "lep", "meet_math", "meet_read", "district" ],

        /*
            Search option values, retrieved from EconW
         */
        validSearchOptionValues : {
            gender: [],
            ethnicity: [],
            poverty: [],
            lep: [],
            meet_math: [],
            meet_read: [],
            district: []
        },
        addSearchOptionValue: function(option, value) {
            this.validSearchOptionValues[option].push(value);
        },
        resetSearchOption: function(option) {
            this.validSearchOptionValues[option] = [];
        },
        resetAllSearchOptions: function() {
            var foo = this;
            this.validSearchOptionNames.forEach(function(val, idx, array) {
                foo.resetSearchOption(val);
            })
        },

        /*
         Selected search options, from the form
         */
        selectedSearchOptions : {
            gender: [],
            ethnicity: [],
            poverty: [],
            lep: [],
            meet_math: [],
            meet_read: [],
            district: []
        },
        resetSelectedSearchOptions: function() {
            var foo = this;
            this.validSearchOptionNames.forEach(function(val, idx, array) {
                foo.selectedSearchOptions[val] = [];
            })
        },
        selectedSearchOptionsAsJSON : function() {
            /*** This function gets called a WHOLE BUNCH OF TIMES by "view1".  Why??? ***/
            return JSON.stringify(this.selectedSearchOptions);
        },

        /*
            Search results
         */
        searchResults : {},
        searchResultsAsJSON : function() {
            /*** This function gets called a WHOLE BUNCH OF TIMES by "view1".  Why??? ***/
            return JSON.stringify(this.searchResults);
        }
    }
})