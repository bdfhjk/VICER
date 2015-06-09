define(function() {

    // void free(void* ptr);

    function free(args, process) {
        process.heap.free(args.ptr.base);
    }

    free.args = ["ptr"];
    free.env = {
        ptr: { type: "pointer", of: { type: "void" } }
    };
    free.returns = { type: "void" };

    return free;

});
