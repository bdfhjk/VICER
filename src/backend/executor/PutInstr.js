define(["./TypeCheck"], function(tc) {

    function PutInstr(num) {
        this.num = tc.verifyInt(num);
    }

    PutInstr.prototype.invoke = function invoke(context, process) {
        context.push(this.num);
    };

    PutInstr.prototype.toString = function toString() {
        return "PUT " + this.num;
    };

    return PutInstr;
    
});