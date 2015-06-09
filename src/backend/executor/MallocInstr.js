define(["./TypeCheck"], function(tc) {

    function MallocInstr(tvalue) {
	this.tvalue = tvalue.type;

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
