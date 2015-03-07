define(["when"], function(when) {

    function processNext(process) {
        return when([{
            event: "CHANGED_VARIABLE",
            variableName: "x",
            value: 2
        }]);
    }

    return {
        processNext: processNext
    };

});