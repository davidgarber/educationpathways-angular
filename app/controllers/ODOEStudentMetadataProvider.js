/**
 * Created by cvonsee on 9/19/15.
 */

myApp.provider( 'ODOEStudentMetadata', function() {
    var uri = '';
    var dataPath = '';
    var dataPathTerminator = '';
    var metadataPath = '';
    var metadataPathTerminator = '';

    this.setURI = function(value) { uri = value; }
    this.setDataPath = function(value) { dataPath = value; }
    this.setDataPathTerminator = function(value) { dataPathTerminator = value; }
    this.setMetadataPath = function(value) { metadataPath = value; }
    this.setMetadataPathTerminator = function(value) { metadataPathTerminator = value; }

    var getMetadata = function(http, q, type) {
        var deferred = q.defer();

        http( {
                method: 'GET',
                url: uri + metadataPath + type + metadataPathTerminator,
                cache: true,
                headers: { 'Accept' : 'application/json' } })
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(errorResponse) {
                deferred.reject( "Error retrieving ODOE metadata = error status "
                    + errorResponse.status
                    + ", status text "
                    + errorResponse.statusText );
            });

        return deferred.promise;
    }

    var getSearchResults = function(http, q, queryOptions) {
        var deferred  = q.defer();

        http( {
                method: 'GET',
                url: uri + dataPath + dataPathTerminator,
                params: queryOptions,
//            cache: false,
                headers: { 'Accept' : 'application/json' } } )
            .then(function(response) {
                deferred.resolve( { searchOptions: queryOptions, result: response.data } );
            }, function(errorResponse) {
                deferred.reject( "Error retrieving search results = error status "
                    + errorResponse.status
                    + ", status text "
                    + errorResponse.statusText );
            });

        return deferred.promise;
    }

    /*
     BIG NOTE: There's an assumption here that the valid search option names shown here match the search option
     as exposed by the ODOEStudentMetadataProvider.  That class will take whatever properties are defined on
     the 'selectedSearchOptions' object and convert them into query params to send via the API.
     */
    var validSearchOptionNames = [ "gender", "ethnicity", "poverty", "lep", "meet_math", "meet_read", "district" ];
    var validSearchOptionDisplayNames = [ "Gender", "Ethnicity", "Poverty level", "Limited English Proficiency", "Math Proficiency", "Reading Proficiency", "District" ];
    var validSearchOptionValues = {};

    this.$get = function($http, $q) {
        /*
         Load 'validSearchOptionValues' with properties that have names equal to the search option names.  Each property
         has an empty array value at start, and as we retrieve the valid values from the ODOEStudentSearchDataProvider we
         add those values to the array.
         */
        validSearchOptionNames.forEach(function(vso, idx, arr) {
            validSearchOptionValues[vso] = [];
            getMetadata($http, $q, vso).then(function(returnedData) {
                for (var key in returnedData) {
                    if (returnedData.hasOwnProperty(key))
                        validSearchOptionValues[vso].push( { id: key, name: returnedData[key] } );
                }
            })
        });

        return {
            /*
                Valid search option functions
             */
            getSearchOptionNames: function() {
                return validSearchOptionNames;
            },

            getSearchOptionDisplayName: function(option) {
                return validSearchOptionDisplayNames[validSearchOptionNames.indexOf(option)];
            },

            getValidSearchOptionValues: function() {
                return validSearchOptionValues;
            },

            getValidSearchOptionValuesForOption: function(option) {
                return validSearchOptionValues[option];
            },

            getValidSearchOptionDisplayNameForOptionValue: function(option, optToFind) {
                var displayName = '';
                for (i in validSearchOptionValues[option]) {
                    var vso = validSearchOptionValues[option][i];
                    if (vso.id === optToFind) {
                        displayName = vso.name;
                        break;
                    }
                }
                return displayName;
            },

            /*
                Data functions

                'searchOptions' is an object that contains properties for each valid search option ('gender', 'ethnicity',
                etc.).  Each property has a value that is an array of valid values for that option; each array value is
                one of the objects returned from the EconNW server.
             */
            search : function(searchOptions) {
                var opts = {};
                for (vso in searchOptions) {
                    if (searchOptions.hasOwnProperty(vso)) {
                        var vsoValues = [];
                        if (searchOptions[vso] instanceof Array) {
                            if (searchOptions[vso].length > 0) {
                                searchOptions[vso].forEach(function (value, idx, array) {
                                    vsoValues.push(value.id);
                                })
                            }
                        } else if ((searchOptions[vso] instanceof Object) &&
                                   (typeof searchOptions[vso] != undefined) &&
                                   (searchOptions[vso].id.length > 0)) {
                            vsoValues.push(searchOptions[vso].id);
                        }

                        if (vsoValues.length > 0)
                            opts[vso] = vsoValues;
                    }
                }

                return getSearchResults($http, $q, opts);
            }
        }
    }
})

myApp.config(['ODOEStudentMetadataProvider', function(smp) {
//    smp.setURI("http://data.econw.com");
    smp.setURI("http://chrisv-cs-test.apigee.net");
    smp.setDataPath("/sankey");
    smp.setMetadataPath("/sankey/meta/");
    smp.setMetadataPathTerminator("/");
    smp.setDataPathTerminator("");
}])

