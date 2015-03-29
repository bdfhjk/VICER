define(["when"], function(when) {

    function processNext(process) {
        // CHANGED_VARIABLE = variableName, value
        // CHANGED_LIST = listName, values(value, name)[] (max 10 elements)
        // CHANGED_TABLE = tableName, values[] (max 10 elements)
        // CHANGED_TREE = treeName, rootName, childrens(name, value)[], connections(id, id)[]
        // CHANGED_POINTERS = pointersName, elements(name, value)[], connections(id, id)[]
        // CHANGED_STACK = ???
        // ACTUAL_LINE = number
        // EXCEPTION = exeptionCode, exceptionText
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