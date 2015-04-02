define(["./TypeCheck", "mod_process"], function(tc, mp) {

    function RefInstr() {

    }

    RefInstr.prototype.invoke = function invoke(context, process) {
        var loc = tc.verifyLoc(context.pop());
        var baseAndOffset = process.memory.getBaseAndOffset(loc);
        context.push(new mp.valueTypes.PointerValue(baseAndOffset.base, baseAndOffset.offset));
    };

    RefInstr.prototype.toString = function toString() {
        return "REF";
    };

    return RefInstr;
    
});