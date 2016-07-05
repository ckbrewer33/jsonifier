var jsonifier = (function() {
	var version = "1.0";
	
	var apiMethods = {
		version: getVersion,
		xmlToJSON: xmlToJSON,
		
		// Methods here only exposed for testing, not intended for api
		isOpenTag: isOpenTag,
		isCloseTag: isCloseTag,
		isEmptyTag: isEmptyTag,
		extractTagName: extractTagName
	};

	return apiMethods;

	function getVersion() {
		return version;
	}

	function xmlToJSON(xmlString) {
		var tokens = tokenizeXML(xmlString);
		
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

	function isOpenTag(tag) {
		var chars = tag.split('');
		return (
			chars[0] === '<' &&
			chars[1] !== '/' &&
			chars[chars.length-2] !== '/' &&
			chars[chars.length-1] === '>'
		);
	}

	function isCloseTag(tag) {
		var chars = tag.split('');
		return (
			chars[0] === '<' &&
			chars[1] === '/' &&
			chars[chars.length-2] !== '/' &&
			chars[chars.length-1] === '>'
		);
	}

	function isEmptyTag(tag) {
		var chars = tag.split('');
		return (
			chars[0] === '<' &&
			chars[chars.length-2] === '/' &&
			chars[chars.length-1] === '>'
		);
	}

	function extractTagName(tag) {
		var ret = tag;

		// Strip the angle brackets
		ret = ret.replace('</', '');
		ret = ret.replace('<', '');
		ret = ret.replace('/>', '');
		ret = ret.replace('>', '');

		// Pick out the tag name from the attributes 
		if (ret.indexOf(' ') !== -1)
		{
			ret = ret.substring(0, ret.indexOf(' '));
		}

		return ret;
	}

	
}).call({});

if (typeof module != "undefined" && module !== null && module.exports) module.exports = jsonifier;
else if (typeof define === "function" && define.amd) define(function() {return jsonifier});