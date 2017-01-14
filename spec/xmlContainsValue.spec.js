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
    it ('should find an attribute on a child node when there are multiple children of the same name', function() {
        var xml =
            '<root>' +
            '<child id="child1">child1Value</child>' +
            '<child id="child2">child2Value</child>' +
            '</root>';

        var value = 'child2';
        var path = 'root/child/@id';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find a value on a grandchild node', function() {
        var xml =
            '<root>' +
            '<child1 id="child1">' +
            '<grandchild>grandchildValue</grandchild>' +
            '</child1>' +
            '</root>';
        var value = 'grandchildValue';
        var path = 'root/child1/grandchild/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find an attribute on a grandchild node', function() {
        var xml =
            '<root>' +
            '<child1 id="child1">' +
            '<grandchild id="grandchild1">grandchildValue</grandchild>' +
            '</child1>' +
            '</root>';

        var value = 'grandchild1';
        var path = 'root/child1/grandchild/@id';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right node value when there are multiple children of the same name', function() {
        var xml =
            '<root>' +
            '<child id="child1">child1Value</child>' +
            '<child id="child2">child2Value</child>' +
            '</root>';

        var value = 'child1Value';
        var path = 'root/child[@id="child1"]/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right node value when there are multiple children of the same name and the desired value is not in the first child', function() {
        var xml =
            '<root>' +
            '<child id="child1">child1Value</child>' +
            '<child id="child2">child2Value</child>' +
            '</root>';

        var value = 'child2Value';
        var path = 'root/child[@id="child2"]/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right node attribute when there are multiple children of the same name', function() {
        var xml =
            '<root>' +
            '<child id="child1" data="child1Data">child1Value</child>' +
            '<child id="child2">child2Value</child>' +
            '</root>';

        var value = 'child1Data';
        var path = 'root/child[@id="child1"]/@data';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right node attribute when there are multiple children of the same name and the desired attribute is not in the first child', function() {
        var xml =
            '<root>' +
            '<child id="child1" data="child1Data">child1Value</child>' +
            '<child id="child2" data="child2Data">child2Value</child>' +
            '</root>';

        var value = 'child2Data';
        var path = 'root/child[@id="child2"]/@data';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right grandchild value when there are multiple children of the same name', function() {
        var xml =
            '<root>' +
            '<child id="child1" data="child1Data">' +
            '<grandchild>grandchild1Value</grandchild>' +
            '</child>' +
            '<child id="child2" data="child2Data">' +
            '<grandchild>grandchild2Value</grandchild>' +
            '</child>' +
            '</root>';

        var value = 'grandchild1Value';
        var path = 'root/child[@id="child1"]/grandchild/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right grandchild value when there are multiple children of the same name and the desired value is not on the first child', function() {
        var xml =
            '<root>' +
            '<child id="child1" data="child1Data">' +
            '<grandchild>grandchild1Value</grandchild>' +
            '</child>' +
            '<child id="child2" data="child2Data">' +
            '<grandchild>grandchild2Value</grandchild>' +
            '</child>' +
            '</root>';

        var value = 'grandchild2Value';
        var path = 'root/child[@id="child2"]/grandchild/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right grandchild value when there are multiple children and grandchildren of the same name and the desired value is not on the first grandchild', function() {
        var xml =
            '<root>' +
            '<child id="child1" data="child1Data">' +
            '<grandchild id="grandchild1">grandchild1Value</grandchild>' +
            '<grandchild id="grandchild2">grandchild2Value</grandchild>' +
            '</child>' +
            '<child id="child2" data="child2Data">' +
            '<grandchild id="grandchild3">grandchild3Value</grandchild>' +
            '<grandchild id="grandchild4">grandchild4Value</grandchild>' +
            '</child>' +
            '</root>';

        var value = 'grandchild4Value';
        var path = 'root/child[@id="child2"]/grandchild[@id="grandchild4"]/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right grandchild value when there are multiple children and grandchildren of the same name and the granchildren are not in sequential order', function() {
        var xml =
            '<root>' +
            '<child id="child1" data="child1Data">' +
            '<grandchild id="grandchild1">grandchild1Value</grandchild>' +
            '<grandchild id="grandchild2">grandchild2Value</grandchild>' +
            '</child>' +
            '<child id="child2" data="child2Data">' +
            '<grandchild id="grandchild3">grandchild3Value</grandchild>' +
            '<grandchild id="grandchild5">grandchild5Value</grandchild>' +
            '<grandchild id="grandchild4">grandchild4Value</grandchild>' +
            '</child>' +
            '</root>';
        var value = 'grandchild5Value';
        var path = 'root/child[@id="child2"]/grandchild[@id="grandchild5"]/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right value on a non-array node when specifying a path with an attribute', function() {
        var xml =
            '<family>' +
            '<parent>' +
            '<child id="child1">' +
            '<toys>' +
            '<toy id="cat" type="stuffed">Mittens</toy>' +
            '</toys>' +
            '</child>' +
            '<child id="child2">' +
            '<toys>' +
            '<toy id="car" type="plastic"></toy>' +
            '<toy id="truck" type="metal"></toy>' +
            '<toy id="dog" type="stuffed">Spot</toy>' +
            '</toys>' +
            '</child>' +
            '</parent>' +
            '<house>4 walls and a door</house>' +
            '</family>';

        var value = 'Mittens';
        var path = '/family/parent/child[@id="child1"]/toys/toy[@id="cat"]/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it ('should find the right value when an attribute value has a space in it', function() {
        var xml =
            '<root>' +
            '<child id="id 1">' +
            '<grandchild>value 1</grandchild>' +
            '</child>' +
            '<child id="id 1">' +
            '<grandchild>value 2</grandchild>' +
            '</child>' +
            '<child id="id 3">' +
            '<grandchild>value 3</grandchild>' +
            '</child>' +
            '<child id="id 4">' +
            '<grandchild>value 4</grandchild>' +
            '</child>' +
            '</root>';

        var value = 'value 1';
        var path = '/root/child[@id="id 1"]/grandchild/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
    it('should return false when an attribute value of a node object doesn\'t exist with a single child', function(){
        var xml =
            '<root>' +
            '<parent>' +
            '<child id="child1">' +
            '<toy id="truck" color="blue" />' +
            '</child>' +
            '</parent>' +
            '</root>';

        var value = "blue";
        var path= 'root/parent/child[@id="child1"]/toy[@id="car"]/@color';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(false);
    });
    it('should return false when an attribute value of a node object doesn\'t exist with multiple children', function(){
        var xml =
            '<root>' +
            '<parent>' +
            '<child id="child1">' +
            '<toy id="truck" color="blue" />' +
            '<toy id="boat" color="white" />' +
            '<toy id="airplane" color="silver" />' +
            '</child>' +
            '</parent>' +
            '</root>';
        var value = "blue";
        var path= 'root/parent/child[@id="child1"]/toy[@id="car"]/@color';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(false);
    });
    it ('should find the correct value when the xpath contains escaped double quote characters', function() {
        var xml =
            '<root>' +
            '<something id="something1">value1</something>' +
            '<something id="something2">value2</something>' +
            '</root>';

        var value = "value1";
        var path = '/root/something[@id=\\"something1\\"]/_value';

        expect(jsonifier.xmlContainsValue(xml, value, path)).toBe(true);
    });
});
