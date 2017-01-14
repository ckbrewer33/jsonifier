# jsonifier
A tool for and extracting values from xml, and parsing xml into json. 

## API Methods
Method Name         | Description                                                                       | Return    | Parameters
------------------- | --------------------------------------------------------------------------------- | ------    | ----------
xmlToJSON           | Parses an xml string into a JSON object                                           | Object    | String: xmlString
validateXML         | Validates an xml string by checking the structure, and for escaped < > characters | boolean   | String: xmlString
xmlContainsValue    | Traverses the given xml to find if the value specified at the given xpath exists  | boolean   | String: xmlString, String: value, String: xpathToValue
getValue            | Returns the value (if exists) at the given xpath                                  | Object    | String: xmlString, String: xpathToValue
xmlContainsNode     | Checks the xml to see if there is a node at the given xpath                       | boolean   | String: xmlString, String: xpathToValue


## Other Notes
* All pathing to xml nodes should follow xpath rules
* If you want to get the value of and xml node, use _\_value_
  * e.g. getValue(xmlString, '/root/parent/child/_value');
