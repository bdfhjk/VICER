define(function() {
    return function generateEvents(result) {
        var events = [];
        if (result.highlight) {
            events.push({
                event: "CURRENT_SEGMENT",
                startLineNumber: result.highlight.first_line - 1,
                endLineNumber: result.highlight.last_line - 1,
                startCharacter: result.highlight.first_column,
                endCharacter: result.highlight.last_column
            });
        }
        if (result.finished) {
            events.push({
                event: "PROGRAM_FINISHED",
                exitCode: result.exitCode                
            });
        }

        var eventNames = {
            "fetch": "USED_VARIABLE",
            "assign": "CHANGED_VARIABLE",
            "fetch_array": "USED_ARRAY_ELEMENT",
            "assign_array": "CHANGED_ARRAY_ELEMENT",
            "alloc_array": "CREATE_ARRAY",
            "dealloc": "DELETE_VARIABLE",
            "dealloc_array": "DELETE_TABLE"
        };

        function addEvent(name, elemChange) {
            events.push({
                event: eventNames[elemChange.type],
                variableName: name.split('|')[1] || eventNames,
                value: elemChange.value,
                offset: elemChange.offset,
                length: elemChange.length
            });
        }

        for (var ch in result.changes) {
            var change = result.changes[ch];
            if (!change.name)
                continue;
            change.changes.forEach(addEvent.bind(null, change.name));
        }
        return events;
    };
});