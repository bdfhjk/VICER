require("../../../prepare-tests.js");

describe("stdlib: scanf", function() {
    var process;
    var scanf;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdio/scanf"], function(_scanf) {
            scanf = _scanf;
            done();
        });
    });

    it("should scan two ints", function() {
        process = createMockProcess("12 -345 otherstuff");
        var a1 = process.createPrimitive("int");
        var a2 = process.createPrimitive("int");
        scanf([process.createString("%d %d"), a1, a2], process);
        expect(process.fetchPtr(a1)).to.equal(12);
        expect(process.fetchPtr(a2)).to.equal(-345);
        expect(worldResults.consumed).to.equal(7);
    });

    it("should scan a string", function() {
        process = createMockProcess("hey you there!");
        var a1 = process.createString("   ");
        var a2 = process.createString("   ");
        scanf([process.createString("%s %s"), a1, a2], process);
        expect(process.readStringPtr(a1)).to.equal("hey");
        expect(process.readStringPtr(a2)).to.equal("you");
        expect(worldResults.consumed).to.equal(7);
    });

    it("should scan a char", function() {
        process = createMockProcess("ABCD");
        var a1 = process.createPrimitive("char");
        var a2 = process.createPrimitive("char");
        scanf([process.createString("%c%c"), a1, a2], process);
        expect(process.fetchPtr(a1)).to.equal(65); // A
        expect(process.fetchPtr(a2)).to.equal(66); // B
        expect(worldResults.consumed).to.equal(2);
    });

    it("should return number of succesfully matched values", function() {
        process = createMockProcess("12");
        var a1 = process.createPrimitive("int");
        var a2 = process.createPrimitive("int");
        expect(scanf([process.createString("%d %d"), a1, a2], process)).to.equal(1);
        expect(worldResults.consumed).to.equal(2);
    });

    it("should return 0 if no match found", function() {
        process = createMockProcess("dd");
        var a1 = process.createPrimitive("int");
        var a2 = process.createPrimitive("int");
        expect(scanf([process.createString("%d %d"), a1, a2], process)).to.equal(0);
        expect(worldResults.consumed).to.equal(0);
    });

});