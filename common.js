
var Common = (function(){

	/**

		This function checks for duck types. 
		http://en.wikipedia.org/wiki/Duck_typing

		Implementation:

		function product (productName, description) {
			this.productName = productName;
			this.description = description;
		}

		var isProduct = isType(["productName", "description"]);
		var ball = new product("ball", "round");

		console.log(isProduct(ball));
	
	//**/


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

	// Gets a url, and makes a key value pair of the query string parameter.
		
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


	// Finds if a value is contained with an array. Works with strings. 

	function exists (arr, value) {
		return arr.indexOf(value) > -1;
	}

	function linkData (address, text, className, id) {
		this.address = address;
		this.text = text;
		this.className = className;
		this.id = id;
	}

	function createLink (data) {
		if (data.address === undefined || data.address === null || data.text === undefined || data.text === null){
			console.error("Error in createLink. The 'address' attribute was " + data.address + ", and the 'text' attribute was " + data.text + ".");
		} else {
			var ret = "<a href='" + data.address + "' ";
		
			if(data.className !== null){
				ret += "class='" + data.className + "' ";
			};

			if (data.id !== undefined) {
				ret += "id='" + data.id + "' ";
			};
			ret += ">" + data.text + "</a>";
			return ret; 
		}
	}


	return {
		getQueryStringParamaters: getQueryStringParamaters,
		isType: isType,
		exists: exists,
		linkData : linkData,
		createLink : createLink
	};

	
})();

