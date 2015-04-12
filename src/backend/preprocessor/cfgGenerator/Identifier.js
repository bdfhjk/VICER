define([
    '../Cfg'
], function (Cfg) {
    function Identifier(paramNode) {
	var variableName = paramNode.value;

	var resolveInstr = new Cfg({
	    type: 'RESOLVE',
	    param: variableName
	});
	var fetchInstr = new Cfg({
	    type: 'FETCH'
	});

	resolveInstr.mergeLeft(fetchInstr);

	return resolveInstr;
    }

    return (function () {
	return Identifier;
    });
});
