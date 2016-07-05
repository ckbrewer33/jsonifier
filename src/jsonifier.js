var jsonifier = (function() {
	var version = "1.0";
	
	var apiMethods = {
		version: getVersion,
		xmlToJSON: xmlToJSON,
		validateXML: validateXML,
		
		// Methods here only exposed for testing, not intended for api
		isOpenTag: isOpenTag,
		isCloseTag: isCloseTag,
		isEmptyTag: isEmptyTag,
		extractTagName: extractTagName,
		extractAttributes: extractAttributes
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
		var ret = stripAngleBrackets(tag);

		// Pick out the tag name from the attributes 
		if (ret.indexOf(' ') !== -1)
		{
			ret = ret.substring(0, ret.indexOf(' '));
		}

		return ret;
	}

	function stripAngleBrackets(tag) {
		ret = tag.replace('</', '');
		ret = ret.replace('<', '');
		ret = ret.replace('/>', '');
		ret = ret.replace('>', '');
		return ret;
	}

	function extractAttributes(tag) {
		tag = stripAngleBrackets(tag);
		var tokens = tag.split(' ');
		var attributes = [];
		var tagName = extractTagName(tag);

		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].indexOf(tagName) === -1) {
				attributes.push(tokens[i]);
			}
		}

		return attributes;
	}

	function validateXML(xmlString) {
		// TODO
	}
	
}).call({});

if (typeof module != "undefined" && module !== null && module.exports) module.exports = jsonifier;
else if (typeof define === "function" && define.amd) define(function() {return jsonifier});