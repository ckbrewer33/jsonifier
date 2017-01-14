describe('xmlContainsNode', function() {
    it('should not find a node where a node does not exist', function() {
        var xml =
            '<root>' +
                '<parent>' +
                    '<child id="child1">' +
                        '<toy id="truck" color="blue" />' +
                    '</child>' +
                '</parent>' +
            '</root>';

        var path= 'root/parent/child[@id="child1"]/name';

        expect(jsonifier.xmlContainsNode(xml, path)).toBe(false);
    });
    it('should find a node where a node does exist', function() {
        var xml =
            '<root>' +
                '<parent>' +
                    '<child id="child1">' +
                        '<toy id="truck" color="blue" />' +
                    '</child>' +
                '</parent>' +
            '</root>';

        var path= 'root/parent/child[@id="child1"]/toy';

        expect(jsonifier.xmlContainsNode(xml, path)).toBe(true);
    });
    it('should not find a node by attribute with a specific id when there is another node with a different id', function() {
        var xml =
            '<root>' +
                '<parent>' +
                    '<child id="child1">' +
                        '<toy id="truck" color="blue" />' +
                        '<toy id="car" color="blue" />' +
                    '</child>' +
                '</parent>' +
            '</root>';

        var path= 'root/parent/child[@id="child1"]/toy[@id="airplane"]';

        expect(jsonifier.xmlContainsNode(xml, path)).toBe(false);
    });
    it('should find a node by attribute with a specific id when there is another node with a different id', function() {
        var xml =
            '<root>' +
                '<parent>' +
                    '<child id="child1">' +
                        '<toy id="truck" color="blue" />' +
                        '<toy id="car" color="blue" />' +
                    '</child>' +
                '</parent>' +
            '</root>';

        var path= 'root/parent/child[@id="child1"]/toy[@id="car"]';

        expect(jsonifier.xmlContainsNode(xml, path)).toBe(true);
    });
    it('should find a node by attribute with a specific id when there is another node with a different id when there is a trailing / character on the xpath', function() {
        var xml =
            '<root>' +
                '<parent>' +
                    '<child id="child1">' +
                        '<toy id="truck" color="blue" />' +
                        '<toy id="car" color="blue" />' +
                    '</child>' +
                '</parent>' +
            '</root>';

        var path= 'root/parent/child[@id="child1"]/toy[@id="car"]/';

        expect(jsonifier.xmlContainsNode(xml, path)).toBe(true);
    });
    it ('should find a node when the xpath contains escaped double quote characters', function() {
        var xml =
            '<root>' +
                '<something id="something1">value1</something>' +
                '<something id="something2">value2</something>' +
            '</root>';

        var path = '/root/something[@id=\\"something1\\"]/_value';

        expect(jsonifier.xmlContainsNode(xml, path)).toBe(true);
    });
});