define(["console"], function(viperConsole) {
    var handlers = {
        'PROGRAM_FINISHED': function handleProgramFinished(vn, params) {
            vn.finishExecution(params.exitCode);
            return "finished";
        },
        'CURRENT_SEGMENT': function handleCurrentSegment(vn, params) {
            vn.changeActualSegment(params.startLineNumber, params.startCharacter, params.endLineNumber, params.endCharacter);
        },
        'USED_VARIABLE': function handleUsedVariable(vn, params) {
            vn.useVariable(params.variableName);
        },
        'CHANGED_VARIABLE': function handleUsedVariable(vn, params) {
            vn.changeVariable(params.variableName, params.value);
        },
        'USED_ARRAY_ELEMENT': function handleUsedVariableElement(vn, params) {
            vn.useTableElement(params.variableName, params.offset);
        },
        'CHANGED_ARRAY_ELEMENT': function handleChangedVariableElement(vn, params) {
            vn.changeTableElement(params.variableName, params.offset, params.value);
        },
        'CREATE_ARRAY': function handleAllocArray(vn, params) {
            vn.createTable(params.variableName, params.length);
        },
        'DELETE_VARIABLE': function handleDeleteVariable(vn, params) {
            vn.deleteVariable(params.variableName);
        },
        'DELETE_TABLE': function handleDeleteTable(vn, params) {
            vn.deleteTable(params.variableName);
        }
    };

    function handleEvents(visualization, events) {
        var finished = false;
        events.forEach(function(ev) {
            if (!handlers[ev.event])
                throw new Error("Unsupported visualization event " + ev.event);
            if (handlers[ev.event](visualization, ev) === "finished") {
                finished = true;
            }
        });
        if (finished) {
            return "finished";
        }
        return "running";
    }

    return handleEvents;
});