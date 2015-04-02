define(["./TypeCheck"], function(tc) {

    function DerefInstr() {

    }

    DerefInstr.prototype.invoke = function invoke(context, process) {
        var ptr = tc.verifyPtr(context.pop());
        context.push(process.memory.at(ptr.base, ptr.offset));
    };

    DerefInstr.prototype.toString = function toString() {
        return "DEREF";
    };

    return DerefInstr;
    
});