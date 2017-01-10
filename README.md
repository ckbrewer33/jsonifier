# jsonifier
A tool for parsing xml into json without using anything from the browser window

## API Methods
* xmlToJson(xmlString) - Parses an xml string into a JavaScript object
* validateXML(xmlString) - Validates an xml string by checking the structure
* xmlContains(xmlString, expectedValue, xpathToValue) - Traverses the given xml to find the indicated value at the path given and returns true if found, false if not found
* getValue(xmlString, xpathToValue) - Traverses the given xml string to find the indicated value at the path given and returns the value if found, otherwise returns null

## Other Notes
* All pathing to xml nodes should follow xpath rules
* If you want to get the value of and xml node, use __value_
  * e.g. getValue(xmlString, '/root/parent/child/_value');
