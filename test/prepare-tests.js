requirejs = require("requirejs");
chai = require("chai");
chai.use(require("chai-as-promised"));
expect = chai.expect;

require("../src/config.js");

var mod_process;

before(function(done) {
    requirejs(["eventEmitter", "mod_process"], function(ee, mp) {
        EventEmitter = ee;
        mod_process = mp;
    });
    done();
});

worldResults = {};

beforeEach(function() {
    worldResults = { consumed: 0 };
});

createMockProcess = function createMockProcess(stdin) {
    var world = new EventEmitter();
    world.on("stdout", function(str) { 
        worldResults.stdout = str;
    });
    world.on("stdin_fetch", function(buf) {
        buf.result = stdin;
    });
    world.on("stdin_consume", function(num) {
        stdin = stdin.substring(num);
        worldResults.consumed += num;
    });
    var proc = new mod_process.Process(world);
    proc.createString = function createString(str) {
        var loc = proc.memory.alloc({
            type: "array",
            of: { type: "char" },
            size: str.length + 1
        });
        mod_process.MemoryUtils.writeString(proc.memory, loc, str);
        return proc.memory.getBaseAndOffset(loc);
    };
    proc.createPrimitive = function createPrimitive(type) {
        return proc.memory.getBaseAndOffset(
            proc.memory.alloc({
                type: type
            }));
    };
    proc.fetchPtr = function fetchPtr(ptr) {
        return proc.memory.fetch(proc.memory.at(ptr.base, ptr.offset));
    };
    proc.readStringPtr = function readStringPtr(ptr) {
        return mod_process.MemoryUtils.readStringPtr(proc.memory, ptr);
    };
    return proc;
};
