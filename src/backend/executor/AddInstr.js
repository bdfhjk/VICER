define(function() {

    function AddInstr(num) {
        this.num = num;
    }

    AddInstr.prototype.invoke = function invoke(context, process) {
        var a1 = context.pop();
        var a2 = context.pop();
        context.push(a1 + a2);
    };

    AddInstr.prototype.toString = function toString() {
        return "ADD";
    };

    return AddInstr;
    
});