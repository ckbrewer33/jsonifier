describe('XML No Attributes No Values', function() {
  describe('xmlToJSON', function() {
    describe('xml with no attributes and no values', function() {
      it ('should build object with one child', function() {
          var test = '<root>' +
                        '<child1>' +
                        '</child1>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {}
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
      it ('should build object with one child empty tag', function() {
          var test = '<root>' +
                        '<child1/>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {}
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
      it ('should build object with multiple children on the root node', function() {
          var test = '<root>' +
                        '<child1></child1>' +
                        '<child2></child2>' +
                        '<child3></child3>' +
                        '<child4></child4>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {},
              'child2': {},
              'child3': {},
              'child4': {}
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
      it ('should build object with multiple empty tag children on the root node', function() {
          var test = '<root>' +
                        '<child1/>' +
                        '<child2/>' +
                        '<child3/>' +
                        '<child4/>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {},
              'child2': {},
              'child3': {},
              'child4': {}
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
      it ('should build object with one child and one grandchild', function() {
          var test = '<root>' +
                        '<child1>' +
                          '<grandchild1></grandchild1>' +
                        '</child1>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {
                'grandchild1': {}
              }
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
      it ('should build object with one child and multiple grandchildren', function() {
          var test = '<root>' +
                        '<child1>' +
                          '<grandchild1></grandchild1>' +
                          '<grandchild2></grandchild2>' +
                        '</child1>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {
                'grandchild1': {},
                'grandchild2': {}
              }
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
      it ('should build object with multiple children and grandchildren', function() {
          var test = '<root>' +
                        '<child1>' +
                          '<grandchild1></grandchild1>' +
                          '<grandchild2></grandchild2>' +
                        '</child1>' +
                        '<child2>' +
                          '<grandchild1></grandchild1>' +
                          '<grandchild2></grandchild2>' +
                        '</child2>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {
                'grandchild1': {},
                'grandchild2': {}
              },
              'child2': {
                'grandchild1': {},
                'grandchild2': {}
              }
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
      it ('should build object with one child, one grandchild, and one great grandchild', function() {
          var test = '<root>' +
                        '<child1>' +
                          '<grandchild1>' +
                            '<greatGrandchild1></greatGrandchild1>' +
                          '</grandchild1>' +
                        '</child1>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {
                'grandchild1': {
                  'greatGrandchild1': {}
                }
              }
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
      it ('should build object with one child, one grandchild, and one great great grandchild', function() {
          var test = '<root>' +
                        '<child1>' +
                          '<grandchild1>' +
                            '<greatGrandchild1>' +
                              '<greatGreatGrandchild1></greatGreatGrandchild1>' +
                            '</greatGrandchild1>' +
                          '</grandchild1>' +
                        '</child1>' +
                      '</root>';
          var expected = {
            'root': {
              'child1': {
                'grandchild1': {
                  'greatGrandchild1': {
                    'greatGreatGrandchild1': {}
                  }
                }
              }
            }
          };
          expect(jsonifier.xmlToJSON(test)).toEqual(expected);
      });
    });
  });
});
