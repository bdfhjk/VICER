define([], function() {

    // int feof(int fd);

    function feof(args, process) {
        if (args.fd !== 0) {
            throw new Error("feof: only stdin as fd is supported");
        }
        var buf = { };
        process.world.emitEvent("stdin_fetch", [buf]);
        if (buf.result.length > 0) {
            return 0;
        }
        return 1;
    }

    feof.args = ["fd"];
    feof.env = {
        type: "int"
    };
    feof.returns = { type: "int" };

    return feof;

});
