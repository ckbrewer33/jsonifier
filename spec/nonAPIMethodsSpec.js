describe('Non-API Methods', function() {
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
    it ('should return an all attributes from <test id="something"/>', function() {
        var test = '<test id="something"/>';
        var expected = ['id="something"'];
        expect(jsonifier.getAttributes(test)).toEqual(expected);
    });
    it ('should return an all attributes from <test attr1="attr1" attr2="attr2"/>', function() {
        var test = '<test attr1="attr1" attr2="attr2"/>';
        var expected = [
          'attr1="attr1"',
          'attr2="attr2"'
        ];
        expect(jsonifier.getAttributes(test)).toEqual(expected);
    });
    it ('should return an all attributes from <test testId="attr1"/> even though the name of the tag is in the name of the attribute', function() {
        var test = '<test testId="attr1"/>';
        var expected = [
          'testId="attr1"'
        ];
        expect(jsonifier.getAttributes(test)).toEqual(expected);
    });
  });

  describe('parseAttribute', function() {
    it ('should return a valid object from \'test="testVal"\'', function() {
        var test = 'test="testVal"';
        var expected = ['@test','testVal'];
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
          '@attr1': 'val1'
      }
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });
    it ('should make an object with properties from <test attr1="val1" attr2="val2" attr3="val3">', function() {
      var test = '<test attr1="val1" attr2="val2" attr3="val3">';
      var expected = {
          '@attr1': 'val1',
          '@attr2': 'val2',
          '@attr3': 'val3'
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
        '@attr1': 'val1'
      }
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });
    it ('should make an object with properties from <test attr1="val1" attr2="val2" attr3="val3"/>', function() {
      var test = '<test attr1="val1" attr2="val2" attr3="val3"/>';
      var expected = {
        '@attr1': 'val1',
        '@attr2': 'val2',
        '@attr3': 'val3'
      }
      expect(jsonifier.createObjectFromTag(test)).toEqual(expected);
    });

    describe('tokenizeXML', function() {
      describe('comments', function() {
        it('should not include comments', function() {
          var test = '<root><!-- comment --></root>';
          var expected = [
            '<root>',
            '</root>'
          ];
          expect(jsonifier.tokenizeXML(test)).toEqual(expected);
        });
        it('should not include complex comments', function() {
          var test = '<root>' +
                        '<!--' + 
                          '<commentedOutNode1/>' +
                          '<commentedOutNode2/>' +
                          '<commentedOutNode3/>' +
                        ' -->' +
                      '</root>';
          var expected = [
            '<root>',
            '</root>'
          ];
          expect(jsonifier.tokenizeXML(test)).toEqual(expected);
        });
      });

      describe('tokenizing', function() {
        it('should not care about white space between nodes', function() {
          var test = '<root> <child> </child> </root>';
          var expected = [
            '<root>',
            '<child>',
            '</child>',
            '</root>'
          ];
          expect(jsonifier.tokenizeXML(test)).toEqual(expected);
        });
      });
    });
  });
});