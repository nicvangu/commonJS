
function AttachmentFile (fileName, serverRelativeUrl) {
    this.FileName = fileName;
    this.ServerRelativeUrl = serverRelativeUrl;
}

function getAttachmentFiles (attachmentData) {
    var files = attachmentData["AttachmentFiles"]["results"];
    var ret = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        ret.push(new AttachmentFile(file["FileName"], file["ServerRelativeUrl"]));
    };

    return ret;
}

function SharePointApiCleaner (restData) {
    this.fields = [];
    this.cleaningFunctions = [];
    this.data = {};

    var SharePointApiCleanerFactory = {
        "AttachmentFiles" : getAttachmentFiles
    }; 

    if(arguments.length === 0){
        console.log("No arguments were passed into the SharePointApiCleaner");
        return restData;
    } else{
        for (var i = 1; i < arguments.length; i++) {
            var field = arguments[i];
            var cleaningFunction = SharePointApiCleanerFactory[field];

            this.fields.push(field);
            this.cleaningFunctions.push(cleaningFunction);
            this.data[field] = cleaningFunction(restData);
        };

    }    
}


var commonJS = (function(){

    function isType (fields) {
        return function(obj) {
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (obj[field] === undefined) {
                    return false;
                };
            };
            return true;
        };
    }


    function getQueryStringParamaters (urlString) {
        var queryString = urlString.substring(urlString.indexOf('?') + 1);
        var queryParams = queryString.split('&');
        var ret = {};

        for (var i = 0; i < queryParams.length; i++) {
            var query = queryParams[i].split('=');
            ret[query[0]] = query[1]; 
        };

        return ret;
    }

    return {
        "getQueryStringParamaters": getQueryStringParamaters,
        "isType": isType
    };

    
})();
