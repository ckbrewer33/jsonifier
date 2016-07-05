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
  
});
