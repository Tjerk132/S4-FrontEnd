import assert from 'assert';

describe('Array', function() {

  describe('#indexOf()', () => {

    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

  });

  describe('something slow', () => {
      
    this.slow(300000); // five minutes
  
    it('should take long enough for me to go make a sandwich', () => {
      // ...
    });

    it('should take less than 500ms', function(done) {
        setTimeout(done, 300);
    });
    
    it('should take less than 500ms as well', function(done) {
        setTimeout(done, 250);
    });
  })
});
