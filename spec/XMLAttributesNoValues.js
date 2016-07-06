/* 
* Tests for the xmlToJSON method, using xml inputs with attribues, but no values
*/
describe('XML Attributes No Values', function() {
  describe('xml with with attributes', function() {
    it ('should build object with one child with one attritube on the root node', function() {
      var test = '<root>' +
                    '<child1 attr1="attrVal1"></child1>' +
                  '</root>';
      var expected = {
        'root': {
          'child1': {
            'attr1': 'attrVal1'
          }
        }
      };
      expect(jsonifier.xmlToJSON(test)).toEqual(expected);
    });
    it ('should build object with an attribute on the root node, and a child with attributes on the root node', function() {
      var test = '<root attr1="attrVal1">' +
                    '<child1 attr1="attrVal1"></child1>' +
                  '</root>';
      var expected = {
        'root': {
          'child1': {
            'attr1': 'attrVal1'
          },
          'attr1': 'attrVal1'
        }
      };
      expect(jsonifier.xmlToJSON(test)).toEqual(expected);
    });
    it ('should build object with two attributes on the root node, and a child with attributes on the root node', function() {
      var test = '<root attr1="attrVal1" attr2="attrVal2">' +
                    '<child1 attr1="attrVal1"></child1>' +
                  '</root>';
      var expected = {
        'root': {
          'child1': {
            'attr1': 'attrVal1'
          },
          'attr1': 'attrVal1',
          'attr2': 'attrVal2'
        }
      };
      expect(jsonifier.xmlToJSON(test)).toEqual(expected);
    });
    it ('should build object with one child with two attritubes on the root node', function() {
      var test = '<root>' +
                    '<child1 attr1="attrVal1" attr2="attrVal2"></child1>' +
                  '</root>';
      var expected = {
        'root': {
          'child1': {
            'attr1': 'attrVal1',
            'attr2': 'attrVal2'
          }
        }
      };
      expect(jsonifier.xmlToJSON(test)).toEqual(expected);
    });
    it ('should build object with two children each with two attritubes on the root node', function() {
      var test = '<root>' +
                    '<child1 attr1="attrVal1" attr2="attrVal2"></child1>' +
                    '<child2 attr1="attrVal1" attr2="attrVal2"></child2>' +
                  '</root>';
      var expected = {
        'root': {
          'child1': {
            'attr1': 'attrVal1',
            'attr2': 'attrVal2'
          },
          'child2': {
            'attr1': 'attrVal1',
            'attr2': 'attrVal2'
          }
        }
      };
      expect(jsonifier.xmlToJSON(test)).toEqual(expected);
    });
    it ('should build object with one child, one grandchild, and one great grandchild, each having one attribute ', function() {
      var test = '<root>' +
                    '<child1 attr1="attrVal1">' +
                      '<grandchild1 attr1="attrVal1">' +
                        '<greatGrandchild1 attr1="attrVal1"></greatGrandchild1>' +
                      '</grandchild1>' +
                    '</child1>' +
                  '</root>';
      var expected = {
        'root': {
          'child1': {
            'grandchild1': {
              'greatGrandchild1': {
                'attr1': 'attrVal1'
              },
              'attr1': 'attrVal1'
            },
            'attr1': 'attrVal1'
          }
        }
      };
      expect(jsonifier.xmlToJSON(test)).toEqual(expected);
    });
  });
});