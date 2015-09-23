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

    var getMetadata = function(http, type) {
        return http( { method: 'GET',
            url: uri + metadataPath + type + metadataPathTerminator,
            cache: true,
            headers: { 'Accept' : 'application/json' } })
            .then(function(response) {
                return response.data;
            }, function(errorResponse) {
                throw new Error( "Error retrieving ODOE metadata = error status "
                    + errorResponse.status
                    + ", status text "
                    + errorResponse.statusText );
            });
    }

    var getSearchResults = function(http, queryOptions) {
        return http( { method: 'GET',
            url: uri + dataPath + dataPathTerminator,
            params: queryOptions,
//            cache: false,
            headers: { 'Accept' : 'application/json' } })
            .then(function(response) {
                return response.data;
            }, function(errorResponse) {
                throw new Error( "Error retrieving search results = error status "
                    + errorResponse.status
                    + ", status text "
                    + errorResponse.statusText );
            });
    }


    this.$get = function($http) {
        return {
            /*
                Metadata functions
             */
            getMetadata : function(type) {
                return getMetadata($http, type);
            },

            /*
                Data functions
             */
            search : function(searchOptions) {
                var opts = {};
                for (vso in searchOptions) {
                    if (searchOptions.hasOwnProperty(vso)) {
                        var vsoValues = [];
                        if ((searchOptions[vso] instanceof Array) && (searchOptions[vso].length > 0)) {
                            searchOptions[vso].forEach(function(value, idx, array) {
                                vsoValues.push(value.id);
                            })
                        } else if ((searchOptions[vso] instanceof String) && (searchOptions[vso].length > 0)) {
                            vsoValues.push(searchOptions[vso].id);
                        }

                        if (vsoValues.length > 0)
                            opts[vso] = vsoValues;
                    }
                }

                return getSearchResults($http, opts);
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

