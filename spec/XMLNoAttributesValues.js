/* 
* Tests for the xmlToJSON method, using xml inputs with values, but no attributes
*/
describe('XML No Attributes Values', function() {
	describe('xmlToJSON', function() {
		it ('should add the root xml value to the "root" json object property', function() {
			var test = '<root>someValue</root>'
			var expected = {
				'root': {
					'_value': 'someValue'
				}
			}
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should add the child xml value to the child json object property', function() {
			 var test = '<root>' +
							'<child1>childValue</child1>' +
						'</root>';
			var expected = {
				'root': {
					'child1': {
						'_value': 'childValue'
					}
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should add multiple child xml values to the correct child json object property', function() {
			 var test = '<root>' +
							'<child1>childValue1</child1>' +
							'<child2>childValue2</child2>' +
						'</root>';
			var expected = {
				'root': {
					'child1': {
						'_value': 'childValue1'
					},
					'child2': {
						'_value': 'childValue2'
					}
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should add multiple grandchild xml values to the correct grandchild json object property', function() {
			 var test = '<root>' +
							'<child1>' +
								'<grandchild>grandchildValue</grandchild>' +
							'</child1>' +
							'<child2>' +
								'<grandchild>grandchildValue</grandchild>' +
							'</child2>' +
						'</root>';
			var expected = {
				'root': {
					'child1': {
						'grandchild': {
							'_value': 'grandchildValue'
						}
					},
					'child2': {
						'grandchild': {
							'_value': 'grandchildValue'
						}
					}
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
		it ('should add multiple greatgrandchild xml values to the correct greatgrandchild json object property', function() {
			 var test = '<root>' +
							'<child1>' +
								'<grandchild>' +
									'<greatgrandchild>greatgrandchildValue</greatgrandchild>' +
								'</grandchild>' +
							'</child1>' +
							'<child2>' +
								'<grandchild>' +
									'<greatgrandchild>greatgrandchildValue</greatgrandchild>' +
								'</grandchild>' +
							'</child2>' +
						'</root>';
			var expected = {
				'root': {
					'child1': {
						'grandchild': {
							'greatgrandchild': {
								'_value': 'greatgrandchildValue'
							}
						}
					},
					'child2': {
						'grandchild': {
							'greatgrandchild': {
								'_value': 'greatgrandchildValue'
							}
						}
					}
				}
			};
			expect(jsonifier.xmlToJSON(test)).toEqual(expected);
		});
	});
});