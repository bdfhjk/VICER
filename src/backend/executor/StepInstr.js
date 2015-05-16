define(function() {

    function StepInstr(codeOffset) {
	    this.codeOffset = codeOffset;
    }

    StepInstr.prototype.invoke = function invoke(context, process) {
        process.pause(this.codeOffset);
    };

    StepInstr.prototype.toString = function toString() {
        return "STEP " + codeOffset;
    };

    return StepInstr;
    
});
