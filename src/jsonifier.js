var jsonifier = (function() {
	var version = "1.0";
	var xmlScope = [];
	var json = {};
	
	var apiMethods = {
		version: getVersion,
		xmlToJSON: xmlToJSON,
		validateXML: validateXML,
		xmlContainsValue: xmlContainsValue,
		getValue: getValue,
		xmlContainsNode: xmlContainsNode,
		
		// Methods here are only exposed for testing, not intended for api
		isOpenTag: isOpenTag,
		isCloseTag: isCloseTag,
		isEmptyTag: isEmptyTag,
		getTagName: getTagName,
		getAttributes: getAttributes,
		createObjectFromTag: createObjectFromTag,
		parseAttribute: parseAttribute,
		tokenizeXML: tokenizeXML
	};

	return apiMethods;

	function getVersion() {
		return version;
	}

	/*
	*	Parses an xml string into a JSON object
	*	@param {String} xmlString - A properly formed xml string
	*	@return {object} - The xml string represented in a JavaScript object
	*/
	function xmlToJSON(xmlString) {
		var tokens = [];
		var currToken = '';
		var i = 0;

		if (!xmlString || '' ===  xmlString) {
			return {};
		}
		validateXML(xmlString);  // Will throw an error if the xml is not valid

		tokens = tokenizeXML(xmlString);		

		// reset scope for this parsing run
		resetGlobalScope();
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
				addObjectAtCurrentScope(currToken, json);
			}
			else if (isValue(currToken)) {
				addValueAtCurrentScope(currToken, json);
			}
			else {
				throw "Invalid token found: " + currToken;
			}
		}
		
		return json;
	}

	/*
	*	Validates an xml string by checking the structure
	*	@param {String} xmlString - A properly formed xml string
	*	@return {boolean} - true if the xml string is valid
	*	@throws
	*/
	function validateXML(xmlString) {
		var tokens = tokenizeXML(xmlString);
		var currToken = '';
		
		resetGlobalScope();
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
			else if (isEmptyTag(currToken)) {
				// Do nothing, empty tag doesn't affect scope
			}
			else if (isValue(currToken)) {
				// Do nothing, values don't affect scope
			}
			else {
				throw "Invalid token found: " + currToken;
			}
		}

		resetGlobalScope();

		return true;
	}

	/*
	*	Generates a json object from the given xml and traverses it to find the indicated value at the path given and returns true if found, false if not found
	*	Use '@' to indicate a path to an attribute value: path/to/@attribute
	*	Use '_value' to indicate a path to a node value: path/to/_value
	*
	*	@param {String} xmlString - The xml document to be searched
	*	@param {String} value - The value to be searched for
	*	@param {String} xpathToValue - the XPath of where to find the value
	*	@return {boolean} - Returns true if the value is found on the indicated path, otherwise returns false
	*/
	function xmlContainsValue(xmlString, value, xpathToValue) {
		var testValue = getValue(xmlString, xpathToValue);

		if (Array.isArray(testValue)) {
			var splitPath = xpathToValue.split('/');
			var valueName = splitPath[splitPath.length-1];

			for (i = 0; i < testValue.length; i++) {
				if (testValue[i][valueName]) {
					if (testValue[i][valueName] === value) {
						return true;
					}
				}
			}
			return false;
		}

		return testValue === value;
	}

	/*
	 *	Generates a json object from the given xml and traverses it to find the indicated value at the path given and returns the value if found.
	 *  If nothing is found, then return null.
	 	*
	 *	Use '@' to indicate a path to an attribute value: path/to/@attribute
	 *	Use '_value' to indicate a path to a node value: path/to/_value
	 *
	 *	@param {String} xmlString - The xml document to be searched
	 *	@param {String} value - The value to be searched for
	 *	@param {String} xpathToValue - the XPath of where to find the value
	 *	@return {Obj} - Returns the object found at the given xpath, or null if there is nothing there.
	 */
	function getValue(xmlString, xpathToValue) {
		var json = xmlToJSON(xmlString);
		var splitPath = [];
		var pathStep = '';
		var tmpObj = {};
		var regEx = /(\w*\[\@\w*\=\"(\w|\s)*\"\])/;
		var attributePath = {};
		var i = 0;

		if ('/' === xpathToValue.charAt(0)) {
			xpathToValue = xpathToValue.substring(1);
		}
		splitPath = xpathToValue.split('/');
		tmpObj = json[splitPath[0]];
		
		// Traverse the json object
		for (i = 1; i < splitPath.length; i++) {
			
			// Check to see if the path we have traversed so far is still defined
			if (!tmpObj) {
				return null;
			}
			
			pathStep = splitPath[i];
			
			// If an xpath attribute is in the path, find the node that the attribute belongs to
			if (regEx.test(pathStep)) {
				attributePath = parseXPathAttribute(pathStep);
				tmpObj = tmpObj[attributePath.tagName];

				if (Array.isArray(tmpObj)) {
					// Loop over the array of node objects until the one with the matching id is found
					var found = false;
					for (var nodeIndex = 0; nodeIndex < tmpObj.length; nodeIndex++) {
						if (tmpObj[nodeIndex][attributePath.attributeName] === attributePath.attributeValue) {
							tmpObj = tmpObj[nodeIndex];
							found = true;
							break;
						}
					}

					// If we didn't find the attribute value indicated in the xpath, then the
					// value doesn't exist so return null
					if (!found) {
						return null;
					}
				}
				// If there is only one node object on the path, make sure it has the correct id.  If not, then
				// the value we're looking for doesn't exist, so return false
				else if (tmpObj[attributePath.attributeName] !== attributePath.attributeValue)
				{
					return null;
				}

			}
			// If the xpath doesn't point to a specific attribute value, just return the path up to this point
			else if (Array.isArray(tmpObj)) {
				return tmpObj;
			}
			else {
				tmpObj = tmpObj[pathStep];
			}
		}

		if (!tmpObj) {
			tmpObj = null;
		}

		return tmpObj
	}

	function xmlContainsNode(xmlString, xPath) {
		//  If there is a trailing '/' character in the xPath, remove it.
		if (xPath.lastIndexOf('/') === xPath.length-1) {
			xPath = xPath.substring(0, xPath.length-1);
		}

		var testValue = getValue(xmlString, xPath);

		if (testValue) {
			return true;
		}
		else
		{
			return false;
		}
	}

	function escapeLTGT(xmlString) {
		var lt_regex = /&lt;/;
		var gt_regex = /&gt;/;
		var amp_regex = /&amp;/;
		var apos_regex = /apos;/;

		xmlString = xmlString.replace(lt_regex, '<');
		xmlString = xmlString.replace(gt_regex, '>');
		xmlString = xmlString.replace(amp_regex, '&');
		xmlString = xmlString.replace(apos_regex, '\'');

		return xmlString;
	}

	function resetGlobalScope() {
		xmlScope = [];
	}


	/*
	*	takes an XPath section containing an attribute and returns an size 3 array containing the tag name, the attribute name, and the attribute value expected
	*	@param {String} xPathAttribute - A section of xPath containing an attribute: i.e. 'tagName[@attribute="something"]'
	*	@return {Array} - returns an object with the path split into properties
	*/
	function parseXPathAttribute(xPathAttribute) {
		var splitPath = xPathAttribute.split('[@');
		var parsedAttribute = parseAttribute(splitPath[1].replace(']', ''));
		
		var attributePathObj = {
			'tagName': splitPath[0],
			'attributeName': parsedAttribute[0],
			'attributeValue': parsedAttribute[1]
		};

		return attributePathObj;
	}

	/*
	*	Adds an object based off of a token to the current xml json object.  Location is determined by the global scope variable
	*	@param {String} token - An xml tag
	*	@param {object} json - the json object currently being built
	*/
	function addObjectAtCurrentScope(token, json) {
		var tagObject = createObjectFromTag(token);
		var tmp = {};
		var i = 0;
		
		// If at the root scope, just add the tag object
		if (xmlScope.length === 1) {
			// If the object already exists, then create an array and put in there with the new tag object
			if (json[getScope()][getTagName(token)]) {
				addSameNameTagObject(token, tagObject, json);
			}
			else {
				json[getScope()][getTagName(token)] = tagObject;
			}

		}
		// Otherwise, navigate to the appropriate scope level in the object to add this new tag data
		else {
			
			tmp = json[xmlScope[0]];
			
			for (i = 1; i < xmlScope.length-1; i++) {
				tmp = tmp[xmlScope[i]];

				if (Array.isArray(tmp)) {
					tmp = tmp[tmp.length-1];
				}
			}

			if (Array.isArray(tmp)) {
				tmp = tmp[tmp.length-1];
			}

			// If there is an array of objects at this scope, the add this property to the last item in the array
			if (Array.isArray(tmp[getScope()])) {
				tmp = tmp[getScope()];
				if (Array.isArray(tmp)) {
					addSameNameTagObject(token, tagObject, tmp);
				}
				else {
					tmp[tmp.length-1][getTagName(token)] = tagObject;
				}
			}
			// If there is already an object with the same name at this location, create an array for it
			else if (tmp[getScope()][getTagName(token)]) {
				addSameNameTagObject(token, tagObject, tmp);
			}
			else {
				tmp[getScope()][getTagName(token)] = tagObject;
			}
		}
	}

	/*
	*	Adds an object array when an object already exists in a certain scope
	*	@param {String} token - An xml tag
	*	@param {object} tagObject - a tagObject created from the createObjectFromTag method
	*	@param {object} json - the json object currently being built
	*/
	function addSameNameTagObject(token, tagObject, json) {
		var tagObjArray = [];
		
		// If the current scope is an array, then get the last object in the array and add the new node there
		if (Array.isArray(json)) {
			json = json[json.length-1];

			if (!json[getTagName(token)]) {
				json[getTagName(token)] = tagObject;
			}
			else if (Array.isArray(json[getTagName(token)])) {
				json[getTagName(token)].push(tagObject);
			}
			else {
				tagObjArray.push(json[getTagName(token)]);
				tagObjArray.push(tagObject);

				json[getTagName(token)] = tagObjArray;
			}
		}

		// if there is already an array here, then just push the new node object to it
		else if (Array.isArray(json[getScope()][getTagName(token)])) {	
			json[getScope()][getTagName(token)].push(tagObject);
		}
		// else create the array and place the existing object in it, followed by the new object
		else {
			tagObjArray.push(json[getScope()][getTagName(token)]);
			tagObjArray.push(tagObject);
			
			// replace the existing scope object with tagObjArray
			json[getScope()][getTagName(token)] = tagObjArray;
		}
	}

	/*
	*	Adds a property to the json object.  Location is determined by the global scope variable
	*	@param {String} token - An xml value (not a tag)
	*	@param {object} json - the json object currently being built
	*/
	function addValueAtCurrentScope(token, json) {
		var tmp = {};
		var i = 0;
		var objArrayEndIndex = 0;

		if (xmlScope.length === 1) {
			json[getScope()]['_value'] = token;
		}
		else {
			// Navigate to the appropriate scope level in the object to add this new tag data
			tmp = json[xmlScope[0]];
			for (i = 1; i < xmlScope.length-1; i++) {
				tmp = tmp[xmlScope[i]];

				if (Array.isArray(tmp)) {
					tmp = tmp[tmp.length-1];
				}
			}

			// If this property is an array of nodes, then move to the last object of the array
			if (Array.isArray(tmp)) {
				tmp = tmp[tmp.length-1];
			}

			// If this property contains an array of nodes, then add the value to the object at the tail of the array
			if (Array.isArray(tmp[getScope()])) {
				objArrayEndIndex = tmp[getScope()].length-1;
				tmp[getScope()][objArrayEndIndex]['_value'] = token;
			}
			else {
				tmp[getScope()]['_value'] = token;
			}
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
		var char = '';
		var escapedXMLString = escapeLTGT(xmlString);
		
		for (var c = 0; c < escapedXMLString.length; c++) {
			char = escapedXMLString.charAt(c);

			// Skip any leading whitespace, tab, and newline characters between nodes
			while (tmpToken === '' && (' ' === char || '\n' === char || '\t' === char)) {
				char = escapedXMLString.charAt(++c);
			}

			// If finished reading a value, push it to the token list
			if ('' !== tmpToken && '<' === char)
			{
				tokens.push(tmpToken);
				tmpToken = '';
			}

			// If not at the end of the tag, keep going
			if ('>' !== char) {
				tmpToken += char;
			}
			
			// End of tag found, push it to the token list
			if ('>' === char) {
				tmpToken += char;
				tokens.push(tmpToken);
				tmpToken = '';
			}

			// Process comment
			if (tmpToken === '<!--') {
				while (true) {
					char = escapedXMLString.charAt(++c);
					
					// Check for the end of the comment
					if ('-' === char) {
						var next = escapedXMLString.charAt(c+1);
						var nextnext = escapedXMLString.charAt(c+2);

						if (next === '-' && nextnext === '>') {
							c += 2; // Advance c past the end of the comment (2 for the final 2 characters in '-->')
							break;
						}
					}
				}
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
		var ret = '';
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
		var attributes = [];
		var attribute = '';
		var parsingValue = false;
		var parsedName = false;
		var tagName = getTagName(tag);
		var char = '';

		tag = stripAngleBrackets(tag);
		
		char = tag.charAt(0);
		attribute += char;
		for (var c = 1; c < tag.length; c++) {
			char = tag.charAt(c);
			
			// If the value parsed out is the tagname, then ignore
			if (!parsedName && attribute === tagName) {
				attribute = '';
				parsedName = true;
			}

			// If at the end of an attribute, then add it to the list and clear the attribute variable
			if (attribute !== '' && char === ' ' && !parsingValue) {
				attributes.push(attribute);
				attribute = '';
			}

			// If current character is a ", then check if starting or finishing an attribute value
			if (char === '"') {
				if (!parsingValue) {
					parsingValue = true;
				}
				else {
					parsingValue = false;
				}
			}

			// If current character is a ' ', and we're not parsing a value, then we're at the end of the attribute.
			// Clear the whitespace character so it isn't included in the attribute token
			if (char === ' ' && !parsingValue) {
				char = '';
			}

			attribute += char;
		}

		// Make sure the last attribute read get added to the list
		if (attribute !== '' && attribute !== tagName) {
			attributes.push(attribute);
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
		var key = '@' + keyValPair[0];
		var value = keyValPair[1].substring(1, keyValPair[1].length-1);

		keyValPair = [key, value];
		return keyValPair;
	}

	/*
	*	Creates a JavaScript object from an xml tag with all of the attributes as object properties.  The node value is not included.
	*	@param {String} tag - An xml tag, with or without attributes
	*	@return {Object} - Returns an object containing all of the xml attributes as properties
	*/
	function createObjectFromTag(tag) {
		var tagObject = {};
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