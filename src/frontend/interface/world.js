define(["console", "eventEmitter"], function(viperConsole, EventEmitter) {

    var stdIn;

    function createWorld(stdInBuffer) {
        var ee = new EventEmitter();
        stdIn = stdInBuffer;
        ee.on("stdout", onStdOut);
        ee.on("stdin_fetch", onStdInFetch);
        ee.on("stdin_consume", onStdInConsume);
        return ee;
    }

    function onStdOut(output) {
        viperConsole.addToConsole("run", output);
    }

    function onStdInFetch(buf) {
        buf.result = stdIn;
    }

    function onStdInConsume(num) {
        stdIn = stdIn.substring(num);
    }

    return createWorld;

});