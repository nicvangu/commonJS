var SharePointApiCleaner = (function(){
    
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

    function clean (restData) {
        var data = {};

        var SharePointApiCleanerFactory = {
            "AttachmentFiles" : getAttachmentFiles,
        }; 

        if(arguments.length === 0){
            console.error("Error in clean. No arguments were passed into the SharePointApiCleaner");
            return restData;
        } else {
            for (var i = 1; i < arguments.length; i++) {
                var field = arguments[i];
                var cleaningFunction = SharePointApiCleanerFactory[field];
                if(cleaningFunction !== undefined){
                    data[field] = cleaningFunction(restData);
                } else{
                    data[field] = restData[field];
                }
            };
        }

        return data;
    }

    return {
        clean : clean,
        getAttachmentFiles : getAttachmentFiles
    }

})();
