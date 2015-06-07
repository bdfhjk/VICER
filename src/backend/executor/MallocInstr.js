define(["./TypeCheck"], function(tc) {

    function MallocInstr() {

    }

    MallocInstr.prototype.invoke = function invoke(context, process) {
        var size = tc.verifyInt(context.pop());
	console.log('MALLOC TYPE: ' + this.tvalue + ', SIZE: ' + size);
    };

    MallocInstr.prototype.toString = function toString() {
        return "MALLOC";
    };

    return MallocInstr;
    
});
