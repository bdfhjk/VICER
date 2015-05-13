define(["console", "eventEmitter"], function(viperConsole, EventEmitter) {

    var stdIn;

    function createWorld() {
        var ee = new EventEmitter();
        stdIn = "Hello, world!";
        ee.on("stdout", onStdOut);
        return ee;
    }

    function onStdOut(output) {
        viperConsole.addToConsole("run", output);
    }

    function onStdIn(buf) {
        buf.char = buf[0];
        buf = buf.substring(1);
    }

    return createWorld;

});