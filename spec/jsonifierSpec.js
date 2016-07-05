describe('jsonifier', function() {
  
  describe('isOpenTag', function() {
    it('should recognize <test> as an open tag', function() {
        var test = '<test>';
        expect(jsonifier.isOpenTag(test)).toEqual(true);
    });

    it('should recognize <test id="something"> as an open tag', function() {
        var test = '<test>';
        expect(jsonifier.isOpenTag(test)).toEqual(true);
    });
  });
  
});
