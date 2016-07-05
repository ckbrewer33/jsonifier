describe('jsonifier', function() {
  
  describe('isOpenTag', function() {
    it('should recognize <test> as an open tag', function() {
        var test = '<test>';
        expect(jsonifier.isOpenTag(test)).toEqual(true);
    });
    it('should recognize <test id="something"> as an open tag', function() {
        var test = '<test id="something">';
        expect(jsonifier.isOpenTag(test)).toEqual(true);
    });
    it('should NOT recognize </test id="something"> as an open tag', function() {
        var test = '</test id="something">';
        expect(jsonifier.isOpenTag(test)).toEqual(false);
    });
    it('should NOT recognize </test> as an open tag', function() {
        var test = '</test>';
        expect(jsonifier.isOpenTag(test)).toEqual(false);
    });
    it('should NOT recognize <test/> as an open tag', function() {
        var test = '<test/>';
        expect(jsonifier.isOpenTag(test)).toEqual(false);
    });
    it('should NOT recognize <test id="something"/> as an open tag', function() {
        var test = '<test id="something"/>';
        expect(jsonifier.isOpenTag(test)).toEqual(false);
    });
  });

  describe('isCloseTag', function() {
    it('should NOT recognize <test> as a close tag', function() {
        var test = '<test>';
        expect(jsonifier.isCloseTag(test)).toEqual(false);
    });
    it('should NOT recognize <test id="something"> as a close tag', function() {
        var test = '<test id="something">';
        expect(jsonifier.isCloseTag(test)).toEqual(false);
    });
    it('should recognize </test id="something"> as a close tag', function() {
        var test = '</test id="something">';
        expect(jsonifier.isCloseTag(test)).toEqual(true);
    });
    it('should recognize </test> as a close tag', function() {
        var test = '</test>';
        expect(jsonifier.isCloseTag(test)).toEqual(true);
    });
    it('should NOT recognize <test/> as a close tag', function() {
        var test = '<test/>';
        expect(jsonifier.isCloseTag(test)).toEqual(false);
    });
    it('should NOT recognize <test id="something"/> as a close tag', function() {
        var test = '<test id="something"/>';
        expect(jsonifier.isCloseTag(test)).toEqual(false);
    });
  });

  describe('isEmptyTag', function() {
    it('should NOT recognize <test> as an empty tag', function() {
        var test = '<test>';
        expect(jsonifier.isEmptyTag(test)).toEqual(false);
    });
    it('should NOT recognize <test id="something"> as an empty tag', function() {
        var test = '<test id="something">';
        expect(jsonifier.isEmptyTag(test)).toEqual(false);
    });
    it('should NOT recognize </test id="something"> as an empty tag', function() {
        var test = '</test id="something">';
        expect(jsonifier.isEmptyTag(test)).toEqual(false);
    });
    it('should NOT recognize </test> as an empty tag', function() {
        var test = '</test>';
        expect(jsonifier.isEmptyTag(test)).toEqual(false);
    });
    it('should recognize <test/> as an empty tag', function() {
        var test = '<test/>';
        expect(jsonifier.isEmptyTag(test)).toEqual(true);
    });
    it('should recognize <test id="something"/> as an empty tag', function() {
        var test = '<test id="something"/>';
        expect(jsonifier.isEmptyTag(test)).toEqual(true);
    });
  });

  describe('getTagName', function() {
    it('should extract "test" from <test>', function() {
        var test = '<test>';
        expect(jsonifier.getTagName(test)).toEqual('test');
    });
    it('should extract "test" from </test>', function() {
        var test = '</test>';
        expect(jsonifier.getTagName(test)).toEqual('test');
    });
    it('should extract "test" from <test/>', function() {
        var test = '<test/>';
        expect(jsonifier.getTagName(test)).toEqual('test');
    });
    it('should extract "test" from <test id="something">', function() {
        var test = '<test id="something">';
        expect(jsonifier.getTagName(test)).toEqual('test');
    });
    it('should extract "test" from </test id="something">', function() {
        var test = '</test id="something">';
        expect(jsonifier.getTagName(test)).toEqual('test');
    });
    it('should extract "test" from <test id="something"/>', function() {
        var test = '<test id="something"/>';
        expect(jsonifier.getTagName(test)).toEqual('test');
    });
  });

  describe('getAttributes', function() {
    it ('should return an empty array from <test>', function() {
        var test = '<test>';
        expect(jsonifier.getAttributes(test)).toEqual([]);
    });
    it ('should return an all attributes from array from <test id="something">', function() {
        var test = '<test id="something">';
        var expected = ['id="something"'];
        expect(jsonifier.getAttributes(test)).toEqual(expected);
    });
    it ('should return an all attributes from array from <test attr1="attr1" attr2="attr2">', function() {
        var test = '<test attr1="attr1" attr2="attr2">';
        var expected = [
          'attr1="attr1"',
          'attr2="attr2"'
        ];
        expect(jsonifier.getAttributes(test)).toEqual(expected);
    });
    it ('should return an empty array from <test/>', function() {
        var test = '<test/>';
        expect(jsonifier.getAttributes(test)).toEqual([]);
    });
    it ('should return an all attributes from array from <test id="something"/>', function() {
        var test = '<test id="something"/>';
        var expected = ['id="something"'];
        expect(jsonifier.getAttributes(test)).toEqual(expected);
    });
    it ('should return an all attributes from array from <test attr1="attr1" attr2="attr2"/>', function() {
        var test = '<test attr1="attr1" attr2="attr2"/>';
        var expected = [
          'attr1="attr1"',
          'attr2="attr2"'
        ];
        expect(jsonifier.getAttributes(test)).toEqual(expected);
    });
  });

  describe('parseAttribute', function() {
    it ('should return a valid object from \'test="testVal"\'', function() {
        var test = 'test="testVal"';
        var expected = ['test','testVal'];
        expect(jsonifier.parseAttribute(test)).toEqual(expected);
    });
    it ('should return a null from an empty string', function() {
        var test = '';
        var expected = null;
        expect(jsonifier.parseAttribute(test)).toEqual(expected);
    });
  });

  describe('createObjectFromTag', function() {
    it ('should make an object with no additional properties or functions from <test>', function() {
      var test = '<test>';
      var expected = {}
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });
    it ('should make an object with properties from <test attr1="val1">', function() {
      var test = '<test attr1="val1">';
      var expected = {
          'attr1': 'val1'
      }
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });
    it ('should make an object with properties from <test attr1="val1" attr2="val2" attr3="val3">', function() {
      var test = '<test attr1="val1" attr2="val2" attr3="val3">';
      var expected = {
          'attr1': 'val1',
          'attr2': 'val2',
          'attr3': 'val3'
      }
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });
    it ('should make an object with no additional properties or functions from <test/>', function() {
      var test = '<test/>';
      var expected = {}
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });
    it ('should make an object with properties from <test attr1="val1"/>', function() {
      var test = '<test attr1="val1"/>';
      var expected = {
        'attr1': 'val1'
      }
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });
    it ('should make an object with properties from <test attr1="val1" attr2="val2" attr3="val3"/>', function() {
      var test = '<test attr1="val1" attr2="val2" attr3="val3"/>';
      var expected = {
        'attr1': 'val1',
        'attr2': 'val2',
        'attr3': 'val3'
      }
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });
  });

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

    describe('xml with with values', function() {
      
    });
  });
});
