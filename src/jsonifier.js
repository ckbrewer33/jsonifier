var jsonifier = (function() {
	var version = "1.0";
	
	var apiMethods = {
		version: getVersion,
		xmlToJSON: xmlToJSON
	};

	return apiMethods;

	function getVersion() {
		return version;
	}

	function xmlToJSON() {
		console.log('hey, do some stuff');
		return "";
	}

	
}).call({});

if (typeof module != "undefined" && module !== null && module.exports) module.exports = jsonifier;
else if (typeof define === "function" && define.amd) define(function() {return jsonifier});