describe('xmlToJSON', function() {
    it ('should correctly parse an xml string that contains literal escaped double quote characters', function() {
        var test =
            '<root>' +
                '<something id=\\"something1\\">value1</something>' +
                '<something id=\\"something2\\">value2</something>' +
            '</root>';

        var expected = {
            "root": {
                "something": [{
                    "@id": "something1",
                    "_value": "value1"
                }, {
                    "@id": "something2",
                    "_value": "value2"
                }]
            }
        };

        expect(jsonifier.xmlToJSON(test)).toEqual(expected);
    })
});