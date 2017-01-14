describe('validateXML', function() {
    it('should yell at you when you pass in javascript with non-matching tags', function() {
        var test =
            '<root>' +
                '<child1>' +
            '</root>';

        expect(function() {
            jsonifier.validateXML(test);
        }).toThrow();
    });
    it('should NOT yell at you when you pass in javascript with non-matching tags', function() {
        var test =
            '<root>' +
                '<child1></child1>' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(true);
    });
    it('should NOT yell at you when using empty tags', function() {
        var test =
            '<root>' +
                '<child1 attr1="attrVal1" attr2="attrVal2"/>' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(true);
    });
    it('should NOT yell at you when there is a value in the xml node', function() {
        var test =
            '<root>' +
                '<child1>someValue</child1>' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(true);
    });
    it ('should yell at you when you pass in an xml string that contains both < and &lt; characters', function() {
        var test =
            '<root>' +
                '&lt;child1>someValue&lt;/child1>' +
            '</root>';

        expect(function() {
            jsonifier.validateXML(test);
        }).toThrow();
    });
    it ('should yell at you when you pass in an xml string that contains both > and &gt; characters', function() {
        var test =
            '<root>' +
                '<child1&gt;someValue</child1&gt;' +
            '</root>';

        expect(function() {
            jsonifier.validateXML(test);
        }).toThrow();
    });
});