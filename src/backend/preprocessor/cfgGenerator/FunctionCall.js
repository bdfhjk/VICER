define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function FunctionCall (paramNode) {
	var functionName = paramNode.name;
	var parameters = paramNode.parameters;

	var resolveInstr = new Cfg({
	    type: 'RESOLVE',
	    param: functionName
	});
	var result;

	if(parameters) {
	    result = cfgGenerator(parameters[0]); 
	    for(var i = 1; i < parameters.length; i++) {
		result.mergeLeft(cfgGenerator(parameters[i]));
	    }
	    result.mergeLeft(resolveInstr);
	} else
	    result = resolveInstr;

	var callInstr = new Cfg({
	    type: 'CALL'
	});

	result.mergeLeft(callInstr);

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return FunctionCall;
    });
});
