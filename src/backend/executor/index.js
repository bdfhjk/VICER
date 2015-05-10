define(["./Executor", "when"], function(executor, when) {

    function processNext(process) {
        // CHANGED_VARIABLE = variableName, value
        // USED_VARIABLE = variableName
        // DELETED_VARIABLE = variableName
        // CHANGED_TABLE = tableName, values[] (max 10 elements)
        // USED_TABLE = tableName, used[] (max 10 elements, if element was used set to 1)
        // DELETED_TABLE = tableName
        // ACTUAL_SEGMENT = startLineNumber, startCharacter, endLineNumber, endCharacter
        // EXCEPTION = exeptionCode, exceptionText
        // ---- PROBABLY DEPRECATED ----
        // CHANGED_LIST = listName, values(value, name)[] (max 10 elements)
        // CHANGED_TREE = treeName, rootName, childrens(name, value)[], connections(id, id)[]
        // CHANGED_POINTERS = pointersName, elements(name, value)[], connections(id, id)[]
        // CHANGED_STACK = ??? 

        return when([{
            event: "CHANGED_VARIABLE",
            variableName: "x",
            value: 2
        }]);
    }

    return {
        executeNext: executor.executeNext,
        createProcess: executor.createProcess,
        finish: executor.finish
    };

});
