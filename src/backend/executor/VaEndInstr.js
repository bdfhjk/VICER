define(function() {

    function VaEndInstr() {

    }

    VaEndInstr.prototype.invoke = function invoke(context, process) {
        context.push("VAEND");
    };

    VaEndInstr.prototype.toString = function toString() {
        return "VAEND";
    };

    return VaEndInstr;
    
});