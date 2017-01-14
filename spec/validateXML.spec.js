describe('validateXML', function() {
    it('should return false when you pass in javascript with non-matching tags', function() {
        var test =
            '<root>' +
                '<child1>' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(false);
    });
    it('should return true when you pass in javascript with matching tags', function() {
        var test =
            '<root>' +
                '<child1></child1>' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(true);
    });
    it('should return true when using empty tags', function() {
        var test =
            '<root>' +
                '<child1 attr1="attrVal1" attr2="attrVal2"/>' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(true);
    });
    it('should return true when there is a value in the xml node', function() {
        var test =
            '<root>' +
                '<child1>someValue</child1>' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(true);
    });
    it ('should return false when you pass in an xml string that contains both < and &lt; characters', function() {
        var test =
            '<root>' +
                '&lt;child1>someValue&lt;/child1>' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(false);
    });
    it ('should return false when you pass in an xml string that contains both > and &gt; characters', function() {
        var test =
            '<root>' +
                '<child1&gt;someValue</child1&gt;' +
            '</root>';

        expect(jsonifier.validateXML(test)).toEqual(false);
    });
});