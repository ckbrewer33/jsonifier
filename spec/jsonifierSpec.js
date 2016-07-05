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

  describe('extractTagName', function() {
    it('should extract "test" from <test>', function() {
        var test = '<test>';
        expect(jsonifier.extractTagName(test)).toEqual('test');
    });
    it('should extract "test" from </test>', function() {
        var test = '</test>';
        expect(jsonifier.extractTagName(test)).toEqual('test');
    });
    it('should extract "test" from <test/>', function() {
        var test = '<test/>';
        expect(jsonifier.extractTagName(test)).toEqual('test');
    });
    it('should extract "test" from <test id="something">', function() {
        var test = '<test id="something">';
        expect(jsonifier.extractTagName(test)).toEqual('test');
    });
    it('should extract "test" from </test id="something">', function() {
        var test = '</test id="something">';
        expect(jsonifier.extractTagName(test)).toEqual('test');
    });
    it('should extract "test" from <test id="something"/>', function() {
        var test = '<test id="something"/>';
        expect(jsonifier.extractTagName(test)).toEqual('test');
    });
  });

  describe('extractAttributes', function() {
    it ('should return an empty array from <test>', function() {
        var test = '<test>';
        expect(jsonifier.extractAttributes(test)).toEqual([]);
    });
    it ('should return an all attributes from array from <test id="something">', function() {
        var test = '<test id="something">';
        var expected = ['id="something"'];
        expect(jsonifier.extractAttributes(test)).toEqual(expected);
    });
    it ('should return an all attributes from array from <test attr1="attr1" attr2="attr2">', function() {
        var test = '<test attr1="attr1" attr2="attr2">';
        var expected = [
          'attr1="attr1"',
          'attr2="attr2"'
        ];
        expect(jsonifier.extractAttributes(test)).toEqual(expected);
    });
    it ('should return an empty array from <test/>', function() {
        var test = '<test/>';
        expect(jsonifier.extractAttributes(test)).toEqual([]);
    });
    it ('should return an all attributes from array from <test id="something"/>', function() {
        var test = '<test id="something"/>';
        var expected = ['id="something"'];
        expect(jsonifier.extractAttributes(test)).toEqual(expected);
    });
    it ('should return an all attributes from array from <test attr1="attr1" attr2="attr2"/>', function() {
        var test = '<test attr1="attr1" attr2="attr2"/>';
        var expected = [
          'attr1="attr1"',
          'attr2="attr2"'
        ];
        expect(jsonifier.extractAttributes(test)).toEqual(expected);
    });
  })
  
});
