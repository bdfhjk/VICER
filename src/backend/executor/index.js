define(["./Executor", "./generateEvents"], function(executor, generateEvents) {

    function executeNextStep(process) {
        // CHANGED_VARIABLE = variableName, value
        // USED_VARIABLE = variableName
        // DELETED_VARIABLE = variableName
        // CHANGED_TABLE = tableName, values[] (max 10 elements)
        // USED_TABLE = tableName, used[] (max 10 elements, if element was used set to 1)
        // DELETED_TABLE = tableName
        // CURRENT_SEGMENT = startLineNumber, startCharacter, endLineNumber, endCharacter
        // EXCEPTION = exeptionCode, exceptionText
        // PROGRAM_FINISHED = exitCode
        // ---- PROBABLY DEPRECATED ----
        // CHANGED_LIST = listName, values(value, name)[] (max 10 elements)
        // CHANGED_TREE = treeName, rootName, childrens(name, value)[], connections(id, id)[]
        // CHANGED_POINTERS = pointersName, elements(name, value)[], connections(id, id)[]
        // CHANGED_STACK = ??? 
        var result = executor.executeNextStep(process);
        return generateEvents(result);
    }

    return {
        executeNextStep: executeNextStep,
        createProcess: executor.createProcess,
        finish: executor.finish
    };

});
