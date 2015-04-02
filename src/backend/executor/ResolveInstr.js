define(function() {

    function ResolveInstr(id) {
        this.id = id;
    }

    ResolveInstr.prototype.invoke = function invoke(context, process) {
        context.push(context.environment.resolve(this.id));
    };

    ResolveInstr.prototype.toString = function toString() {
        return "RESOLVE " + this.id;
    };

    return ResolveInstr;
    
});