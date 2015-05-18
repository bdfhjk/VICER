define(["./TypeCheck"], function(tc) {

    function DivInstr() {

    }

    DivInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
	if (a2 === 0) {
	    throw new Error("Division by zero");
	}
        context.push(a2 / a1);
    };

    DivInstr.prototype.toString = function toString() {
        return "MUL";
    };

    return DivInstr;
    
});
