define(["when", "mod_process"], function(when, Process) {

    function compile(source) {
        return when(new Process());
    }

    return {
        compile: compile
    };
    
});