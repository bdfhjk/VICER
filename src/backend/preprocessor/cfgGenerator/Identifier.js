define([
    '../Cfg'
], function (Cfg) {
    function Identifier(paramNode) {
	var variableName = paramNode.value;

	var resolveInstr = new Cfg({
	    type: 'RESOLVE',
	    param: variableName
	});

	if(!options || !options.wantLocation) {
	    var refInstr = new Cfg({
		type: 'FETCH'
	    });
	    resolveInstr.mergeLeft(refInstr);
	}

	return resolveInstr;
    }

    return (function () {
	return Identifier;
    });
});
