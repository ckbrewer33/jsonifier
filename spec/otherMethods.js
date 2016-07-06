describe('Other Methods', function() {
	describe('validateXML', function() {
		it('should yell at you when you pass in javascript with non-matching tags', function() {
			var test = '<root>' +
							'<child1>' +
						'</root>';

			expect(function() {
				jsonifier.validateXML(test);
			}).toThrow();
		});
		it('should NOT yell at you when you pass in javascript with non-matching tags', function() {
			var test = '<root>' +
							'<child1></child1>' +
						'</root>';

			expect(jsonifier.validateXML(test)).toEqual(true);
		});
		it('should NOT yell at you when using empty tags', function() {
			var test = '<root>' +
							'<child1 attr1="attrVal1" attr2="attrVal2"></child1>' +
						'</root>';
			expect(jsonifier.validateXML(test)).toEqual(true);           
		});
	});
});