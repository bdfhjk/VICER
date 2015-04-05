define([
    '../Cfg'
], function (Cfg) {
    function ImplicitCall(paramNode) {
	var variableName = paramNode.name;

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
	return ImplicitCall;
    });
});
