var assert = require("assert");

describe('main', function () {

  beforeEach(function () {
    this.result = 2 + 1;
  })

  it('should have dom element', function () {
    assert.equal(this.result, 3);
  });

});
