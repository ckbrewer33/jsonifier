/* 
* Tests for the xmlToJSON method, using xml inputs with values and attributes
*/
describe('XML With Attributes and Values', function() {
	describe('xmlToJSON', function() {
		it ('should add the root xml value to the "root" json object property', function() {
			var test = '<root rootId="rootId">someValue</root>';
			var expected = {
				'root': {
					'@rootId': 'rootId',
					'_value': 'someValue'
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should add the child xml value and attribute to the child json object property', function() {
			 var test = '<root>' +
							'<child1 childId="childId">childValue</child1>' +
						'</root>';
			var expected = {
				'root': {
					'child1': {
						'@childId': 'childId',
						'_value': 'childValue'
					}
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should add multiple child xml values to the correct child json object property', function() {
			 var test = '<root>' +
							'<child1 child1Id="child1Id">childValue1</child1>' +
							'<child2 child2Id="child2Id">childValue2</child2>' +
						'</root>';
			var expected = {
				'root': {
					'child1': {
						'@child1Id': 'child1Id',
						'_value': 'childValue1'
					},
					'child2': {
						'@child2Id': 'child2Id',
						'_value': 'childValue2'
					}
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should add multiple grandchild xml values to the correct grandchild json object property', function() {
			 var test = '<root id="root">' +
							'<child1 id="child1">' +
								'<grandchild id="grandchild">grandchildValue</grandchild>' +
							'</child1>' +
							'<child2 id="child2">' +
								'<grandchild id="grandchild">grandchildValue</grandchild>' +
							'</child2>' +
						'</root>';
			var expected = {
				'root': {
					'child1': {
						'grandchild': {
							'@id': 'grandchild',
							'_value': 'grandchildValue'
						},
						'@id': 'child1'
					},
					'child2': {
						'grandchild': {
							'@id': 'grandchild',
							'_value': 'grandchildValue'
						},
						'@id': 'child2'
					},
					'@id': 'root'
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should add multiple grandchild xml values to the correct grandchild json object property when children nodes have the same name', function() {
			 var test = '<root id="root">' +
							'<child id="child1">' +
								'<grandchild id="grandchild">grandchildValue</grandchild>' +
							'</child>' +
							'<child id="child2">' +
								'<grandchild id="grandchild">grandchildValue</grandchild>' +
							'</child>' +
						'</root>';
			var expected = {
				'root': {
					'child':[
						{
							'grandchild': {
								'@id': 'grandchild',
								'_value': 'grandchildValue'
							},
							'@id': 'child1'
						},
						{
							'grandchild': {
								'@id': 'grandchild',
								'_value': 'grandchildValue'
							},
							'@id': 'child2'
						}
					],
					'@id': 'root'
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
	});
});