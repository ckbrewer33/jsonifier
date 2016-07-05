var jsonifier = (function() {
	var version = "0.1";
	var xmlScope = [];
	var json = {};
	
	var apiMethods = {
		version: getVersion,
		xmlToJSON: xmlToJSON,
		validateXML: validateXML, // NOT IMPLEMENTED
		
		// Methods here are only exposed for testing, not intended for api
		isOpenTag: isOpenTag,
		isCloseTag: isCloseTag,
		isEmptyTag: isEmptyTag,
		getTagName: getTagName,
		getAttributes: getAttributes,
		createObjectFromTag: createObjectFromTag,
		parseAttribute: parseAttribute
	};

	return apiMethods;

	function getVersion() {
		return version;
	}

	/*
	*	Parses an xml string into a JavaScript object
	*	@param {String} xmlString - A propely formed xml string
	*	@return {object} - The xml string represented in a JavaScript object
	*/
	function xmlToJSON(xmlString) {
		var tokens = tokenizeXML(xmlString);
		var currToken = '';
		var i = 0;

		// reset scope for this parsing run
		xmlScope = [];
		scopeDown(tokens[0]);

		// Reset the json output object for this parsing run
		json = {};
		json[getTagName(tokens[0])] = createObjectFromTag(tokens[0]);

		// Parse the xml tree via the tokens
		for (i = 1; i < tokens.length; i++) {
			currToken = tokens[i];
			if (isOpenTag(currToken)) {
				addObjectAtCurrentScope(currToken, json);
				scopeDown(currToken)
			}
			else if (isCloseTag(currToken)) {
				scopeUp();
			}
			else if (isEmptyTag(currToken)) {

			}
			else if (isValue(currToken)) {

			}
			else {
				throw "Invalid token found: " + currToken;
			}
		}
		
		return json;
	}

	/*
	*	Adds an object based off of a token to the current xml json object.  Location is determined by the global scope variable
	*	@param {String} token - An xml token
	*/
	function addObjectAtCurrentScope(token, json) {
		var tagObject = createObjectFromTag(token);
		var tmp = {};
		var i = 0;
		
		// If at the root scope, just add the tag object
		if (xmlScope.length === 1) {
			json[getScope()][getTagName(token)] = tagObject;
		}
		else {
			// Navigate to the appropriate scope level in the object to add this new tag data
			for (i = 0; i < xmlScope.length-1; i++) {
				tmp = json[xmlScope[i]];
			}

			tmp[getScope()][getTagName(token)] = tagObject;
		}
	}

	/*
	*	Splits an xml string into individual tokens including tags and values.
	*	@param {String} xmlString
	*	@return {Array} - Returns an array of all the tags and values of the xml string
	*/
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

	function isOpenTag(token) {
		var chars = token.split('');
		return (
			chars[0] === '<' &&
			chars[1] !== '/' &&
			chars[chars.length-2] !== '/' &&
			chars[chars.length-1] === '>'
		);
	}

	function isCloseTag(token) {
		var chars = token.split('');
		return (
			chars[0] === '<' &&
			chars[1] === '/' &&
			chars[chars.length-2] !== '/' &&
			chars[chars.length-1] === '>'
		);
	}

	function isEmptyTag(token) {
		var chars = token.split('');
		return (
			chars[0] === '<' &&
			chars[chars.length-2] === '/' &&
			chars[chars.length-1] === '>'
		);
	}

	function isValue(token) {
		return (!isOpenTag(token) && !isCloseTag(token) && !isEmptyTag(token));
	}

	function getTagName(tag) {
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

	/**
	 * Gets all of the attributes from an xml tag
	 * @param {String} tag
	 * @return {Array} - Returns an array of all the attributes in the format 'key="value"'
	 */
	function getAttributes(tag) {
		tag = stripAngleBrackets(tag);
		
		var tokens = tag.split(' ');
		var attributes = [];
		var tagName = getTagName(tag);
		var currAttribute = {};

		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].indexOf(tagName) === -1) {
				attributes.push(tokens[i]);
			}
		}

		return attributes;
	}

	/*
	*	Parses attribute strings into a size 2 array for assignment to objects
	*	@param {String} attribute - An xml attribute as it appears in the xml, i.e. 'key="value"'
	*	@return {Array}  - Returns an array of size 2, with the attribute name in position [0] and the value in position [1]
	*/
	function parseAttribute(attribute) {
		if ('' === attribute) {
			return null;
		}

		var keyValPair = attribute.split('=');
		var key = keyValPair[0];
		var value = keyValPair[1].substring(1, keyValPair[1].length-1);
		

		keyValPair = [key, value]
		return keyValPair;
	}

	/*
	*	Creates a JavaScript object from an xml tag with all of the attributes as object properties.  The node value is not included.
	*	@param {String} tag - An xml tag, with or without attributes
	*	@return {Object} - Returns an object containing all of the xml attributes as properties
	*/
	function createObjectFromTag(tag) {
		var tagObject = {};
		var tagName = getTagName(tag);
		var attributes = getAttributes(tag);
		var currAttribute;
		var key;
		var value;
		var i = 0;
		
		for (i = 0; i < attributes.length; i++) {
			currAttribute = parseAttribute(attributes[i]);
			key = currAttribute[0];
			value = currAttribute[1];
			tagObject[key] = value;
		}

		return tagObject;
	}

	function validateXML(xmlString) {
		var tokens = tokenizeXML(xmlString);
		var currToken = '';
		
		xmlScope = [];
		for (var i = 0; i < tokens.length; i++) {
			currToken = tokens[i];
			if (isOpenTag(currToken)) {
				scopeDown(currToken)
			}
			else if (isCloseTag(currToken)) {
				if (getScope() !== getTagName(currToken)) {
					throw "Malformed xml string -- " + getScope() + ': missing closing tag';
				}
				scopeUp();
			}
			else {
				throw "Invalid token found: " + currToken;
			}
		}

		xmlScope = [];

		return true;
	}

	function scopeDown(tag) {
		xmlScope.push(getTagName(tag));
	}

	function scopeUp() {
		xmlScope.pop();
	}

	function getScope() {
		return xmlScope[xmlScope.length-1];
	}
	
}).call({});

if (typeof module != "undefined" && module !== null && module.exports) module.exports = jsonifier;
else if (typeof define === "function" && define.amd) define(function() {return jsonifier});