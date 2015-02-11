var expect = require("chai").expect;
var sinon = require("sinon");
var TestableFile = require("../../../src/backend/engine/TestableFile");

describe("Testable File", function() {
    it("should properly call a dependency", function() {
        var stub = sinon.stub().returns(3);
        expect(new TestableFile(stub).activity()).to.equal(6);
    });
});
