define(function() {

    function ResolveInstr(id) {
        this.id = id;
    }

    ResolveInstr.prototype.invoke = function invoke(context, process) {
        var loc = context.environment.resolve(this.id);
        process.getMemoryTracker().register(this.id, loc);
        context.push(loc);
    };

    ResolveInstr.prototype.toString = function toString() {
        return "RESOLVE " + this.id;
    };

    return ResolveInstr;
    
});