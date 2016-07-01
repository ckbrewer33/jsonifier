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

	function xmlToJSON(xmlString) {
		var tokens = tokenizeXML(xmlString);
		console.log(tokens);
		return "";
	}

	function tokenizeXML(xmlString) {
		var tokens = [];
		var tmpToken = '';
		var chars = xmlString.split('');
		
		for (var c = 0; c < chars.length; c++) {
			if ('' !== tmpToken && '<' === chars[c])
			{
				tokens.push(tmpToken);
				tmpToken = '';
			}

			if ('>' !== chars[c]) {
				tmpToken += chars[c];
			}
			
			if ('>' === chars[c]) {
				tmpToken += chars[c];
				tokens.push(tmpToken);
				tmpToken = '';
			}
		}

		return tokens;
	}

	
}).call({});

if (typeof module != "undefined" && module !== null && module.exports) module.exports = jsonifier;
else if (typeof define === "function" && define.amd) define(function() {return jsonifier});