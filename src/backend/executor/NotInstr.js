define(function() {

    function NotInstr() {

    }

    NotInstr.prototype.invoke = function invoke(context, process) {
        var a = context.pop();
        context.push(a ? 0 : 1);
    };

    NotInstr.prototype.toString = function toString() {
        return "NOT";
    };

    return NotInstr;
    
});