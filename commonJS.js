
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


