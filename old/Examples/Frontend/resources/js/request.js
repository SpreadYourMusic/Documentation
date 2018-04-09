
/**
 * url does not include the domain or IP, just the folders
 */
function performAsyncGetRequest(url, successCallback, errorCallback, async, requestTimeout){
    if(successCallback === undefined) successCallback = defaultSuccessCallback;
    if(errorCallback === undefined) errorCallback = defaultErrorCallback;
    if(async === undefined) async = true;
    if(requestTimeout === undefined) requestTimeout = 10000;
  $.ajax({
   async: async,
   /* Should be included by default.
    // Instructions for how to deserialize a `json`
    converters: {
      'text json': function(result) {
        // Do Stuff
        return JSON.parse(result);
      }
    },*/
   
    // Expect a `json` back from server
    dataType: 'json',
    crossDomain: true,
    
    url: "http://localhost:8080" + url,
    //method: "GET" //GET, POST, DELETE, PUT
    //type: post_data //Used for POST requests
    error: errorCallback,
    success: successCallback,
    jsonpCallback: successCallback,
    timeout: requestTimeout
  });
}

function performAsyncPostRequest(url, post_data, successCallback, errorCallback, requestTimeout){

    if(successCallback === undefined) successCallback = defaultSuccessCallback;
    if(errorCallback === undefined) errorCallback = defaultErrorCallback;
    if(requestTimeout === undefined) requestTimeout = 10000;

    $.ajax({
        /* Should be included by default.
         // Instructions for how to deserialize a `json`
         converters: {
           'text json': function(result) {
             // Do Stuff
             return JSON.parse(result);
           }
         },*/

        // Expect a `json` back from server
        dataType: 'json',
        crossDomain: true,

        url: "http://localhost:8080" + url,
        method: "POST", //GET, POST, DELETE, PUT
        //type: post_data, //Used for POST requests
        data: post_data,
        error: errorCallback,
        success: successCallback,
        jsonpCallback: successCallback,
        timeout: requestTimeout
    });
}

function performSyncGetRequest(url, errorCallback, requestTimeout){
    if(errorCallback === undefined){
        errorCallback = defaultErrorCallback;
    }

    if(requestTimeout === undefined){
        requestTimeout = 10000;
    }

    var json = "";
    $.ajax({
        async: false,
        /* Should be included by default.
         // Instructions for how to deserialize a `json`
         converters: {
           'text json': function(result) {
             // Do Stuff
             return JSON.parse(result);
           }
         },*/

        // Expect a `json` back from server
        dataType: 'json',
        crossDomain: true,

        url: "http://localhost:8080" + url,
        //method: "GET" //GET, POST, DELETE, PUT
        //type: post_data //Used for POST requests
        error: errorCallback,
        success: function (data, textStatus, jqXHR) {
            json = data;
        },
        timeout: requestTimeout
    });

    return json;
}

function defaultErrorCallback(json){
  console.log("A request failed to be performed: " + json);
  console.log(json);
}

function defaultSuccessCallback(data, textStatus, jqXHR){
  console.log("A request was successfully performed.");
}

function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam)
        {
            return sParameterName[1];
        }
    }

    return null;
}
  