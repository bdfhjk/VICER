define(function() {

    function NoopInstr(num) {
	// NOOP
    }

    NoopInstr.prototype.invoke = function invoke(context, process) {
	// NOOP
    };

    NoopInstr.prototype.toString = function toString() {
        return "NOOP";
    };

    return NoopInstr;
    
});
