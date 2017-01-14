describe('xmlContainsValue', function() {
    it('should find a value on the root node', function () {
        var xml =
            '<root>' +
                'rootValue' +
            '</root>';

        expect(jsonifier.xmlContainsValue(xml, 'rootValue', 'root/_value')).toBe(true);
    });
    it('should find a value on the root node with a leading slash on the xpath', function () {
        var xml =
            '<root>' +
                'rootValue' +
            '</root>';

        expect(jsonifier.xmlContainsValue(xml, 'rootValue', '/root/_value')).toBe(true);
    });
    it('should find an attribute on the root node', function () {
        var xml =
            '<root id="rootId">' +
                'rootValue' +
            '</root>';

        expect(jsonifier.xmlContainsValue(xml, 'rootId', 'root/@id')).toBe(true);
    });
    it('should find a value on a child node', function () {
        var xml =
            '<root>' +
                '<child1>childValue</child1>' +
            '</root>';

        var value = 'childValue';
        var path = 'root/child1/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it('should find an attribute on a child node', function () {
        var xml =
            '<root>' +
                '<child1 id="child1">childValue</child1>' +
            '</root>';

        var value = 'child1';
        var path = 'root/child1/@id';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
});
