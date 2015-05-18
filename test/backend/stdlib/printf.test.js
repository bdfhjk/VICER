require("../../prepare-tests.js");

describe("stdlib: printf", function() {

    var process;
    var printf;
    var mp;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdio/printf", "mod_process"], function(_printf, _mp) {
            printf = _printf;
            mp = _mp;
            done();
        });
    });

    beforeEach(function() {
        result = undefined;
        process = createMockProcess();
    });

    it("printf: should print a simple format string", function() {
        printf();
    });

    it("abs: should turn negative to positive", function() {
        expect(abs({val: -12})).to.equal(12);
    });

});