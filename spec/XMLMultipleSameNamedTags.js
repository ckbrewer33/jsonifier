/* 
* Tests for the xmlToJSON method, using xml inputs with duplicate tag names
*/
describe('XML With Attributes and Values', function() {
	describe('xmlToJSON', function() {
		it ('should create an array of objects to hold two tag objects of the same name on the root node', function() {
			var test = '<root>' + 
							'<child id="child1"></child>' +
							'<child id="child2"></child>' +
						'</root>'
			var expected = {
				'root': {
					'child': [
						{'@id': 'child1'},
						{'@id': 'child2'}
					]
				}
			}
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should create an array of objects to hold three tag objects of the same name on the root node', function() {
			var test = '<root>' + 
							'<child id="child1"></child>' +
							'<child id="child2"></child>' +
							'<child id="child3"></child>' +
						'</root>'
			var expected = {
				'root': {
					'child': [
						{'@id': 'child1'},
						{'@id': 'child2'},
						{'@id': 'child3'}
					]
				}
			}
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should create an array of objects to hold three tag objects of the same name on the root node, each having a value', function() {
			var test = '<root>' + 
							'<child id="child1">child1Val</child>' +
							'<child id="child2">child2Val</child>' +
							'<child id="child3">child3Val</child>' +
						'</root>'
			var expected = {
				'root': {
					'child': [
						{
							'@id': 'child1',
							'_value': 'child1Val'
						},
						{
							'@id': 'child2',
							'_value': 'child2Val'
						},
						{
							'@id': 'child3',
							'_value': 'child3Val'
						}
					]
				}
			}
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
	});
});