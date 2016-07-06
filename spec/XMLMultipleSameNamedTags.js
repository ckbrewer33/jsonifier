/* 
* Tests for the xmlToJSON method, using xml inputs with duplicate tag names
*/
describe('XML With Attributes and Values and duplicate tag names', function() {
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
		it ('should create an array of tag objects on the child of the root node, each having an attribute', function() {
			var test = '<root>' + 
							'<child id="child1">' +
								'<grandchild id="grandchild1"></grandchild>' +
								'<grandchild id="grandchild2"></grandchild>' +
							'</child>' +
						'</root>'
			var expected = {
				'root': {
					'child':
					{
						'@id': 'child1',
						'grandchild': [
							{'@id': 'grandchild1'},
							{'@id': 'grandchild2'}
						]
					},	
				}
			}
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should create an array of tag objects on the child of the root node, neither having any attributes', function() {
			var test = '<root>' + 
							'<child id="child1">' +
								'<grandchild></grandchild>' +
								'<grandchild></grandchild>' +
							'</child>' +
						'</root>'
			var expected = {
				'root': {
					'child':
					{
						'@id': 'child1',
						'grandchild': [
							{},
							{}
						]
					},	
				}
			}
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
	});
});