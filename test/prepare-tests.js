requirejs = require("requirejs");
chai = require("chai");
chai.use(require("chai-as-promised"));
expect = chai.expect;

require("../src/config.js");

var mod_process;

before(function(done) {
    requirejs(["eventEmitter", "mod_process"], function(ee, m) {
        EventEmitter = ee;
        mod_process = mp;
    });
});

worldResults = {};

beforeEach(function() {
    worldResults = {};
});

function createMockProcess(stdin) {
    var world = new EventEmitter();
    world.on("stdout", function(str) { 
        worldResults.stdout = str;
    });
    world.on("stdin", function(buf) {
        buf.result = stdin;
    });
    world.on("stdin_consume", function(num) {
        stdin = stdin.substring(num);
    });
    var proc = mod_process.Process(world);
    proc.createString = function createString() {
        var arr = proc.memory.alloc({
            type: "array",
            of: { type: "char" },
            length: 15
        });
    };
    return proc;
}
