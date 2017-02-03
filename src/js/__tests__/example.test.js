var expect = require('chai').expect;
var sinon = require('sinon');

describe('main', function () {

  beforeEach(function () {
    this.testFunction = function () {
      return 2 + 1;
    };

    this.result = this.testFunction();
  })

  it('should have dom element', function () {
    expect(this.result).equal(3);
  });

  it('should call testFunction', function () {
    this.testFunction = sinon.spy();
    this.testFunction();
    expect(this.testFunction.called).to.equal(true);
  });

});
