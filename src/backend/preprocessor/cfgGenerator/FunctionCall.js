define([
    '../Cfg'
], function (Cfg) {
    function FunctionCall (paramNode) {
	var functionName = paramNode.name;

	var resolveInstr = new Cfg({
	    type: 'RESOLVE',
	    param: functionName
	});
	var callInstr = new Cfg({
	    type: 'CALL'
	});

	resolveInstr.mergeLeft(callInstr);

	return resolveInstr;
    }

    return (function() {
	return FunctionCall;
    });
});
