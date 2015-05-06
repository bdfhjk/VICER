define(["./TypeCheck", "mod_process"], function(tc, mp) {

    function createPointerOp(op) {
        return PaddInstr.bind(null, op);
    }

    function PaddInstr(op) {
        this.op = op;
    }

    PaddInstr.prototype.invoke = function invoke(context, process) {
        var num = tc.verifyInt(context.pop());
        var ptr = tc.verifyPtr(context.pop());
        // verify if location exists
        var newOffset = this.op === "PADD" ? ptr.offset + num : ptr.offset - num;
        context.push(new mp.valueTypes.PointerValue(ptr.base, newOffset));
    };

    PaddInstr.prototype.toString = function toString() {
        return this.op;
    };

    return createPointerOp;
    
});