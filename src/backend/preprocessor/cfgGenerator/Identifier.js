define([
    '../Cfg'
], function (Cfg) {
    function Identifier(paramNode, options) {
	var variableName = paramNode.value;

	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: variableName
	});

	if (!options || !options.wantLocation) {
	    if (paramNode.isPointer) {
		var refInstr = new Cfg ({
		    type: 'REF'
		});
		resolveInstr.mergeLeft(refInstr);
	    } else {
		var fetchInstr = new Cfg ({
		    type: 'FETCH'
		});
		resolveInstr.mergeLeft(fetchInstr);
	    }
	}

	return resolveInstr;
    }

    return (function () {
	return Identifier;
    });
});
