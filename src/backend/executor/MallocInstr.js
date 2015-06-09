define(["./TypeCheck", "mod_process"], function(tc, mp) {

    function MallocInstr(tvalue) {
	   this.type = tvalue.type;
    }

    MallocInstr.prototype.invoke = function invoke(context, process) {
        var size = tc.verifyInt(context.pop());
        var loc = process.heap.alloc(size, this.type);
        var baseAndOffset = process.memory.getBaseAndOffset(loc);
        context.push(new mp.valueTypes.PointerValue(baseAndOffset.base, baseAndOffset.offset));
    };

    MallocInstr.prototype.toString = function toString() {
        return "MALLOC";
    };

    return MallocInstr;
    
});
