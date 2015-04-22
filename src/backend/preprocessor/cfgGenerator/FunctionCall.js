define([
    '../Cfg'
], function (Cfg) {
    var cfgGenerator;

    function FunctionCall (paramNode) {
	var functionName = paramNode.name;
	var isVariadic = false;
	var parameters = paramNode.parameters;
	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: functionName
	});
	var result;

	if (parameters && parameters.length > 0) {
	    var firstParameter = parameters[0];
	    result = cfgGenerator(firstParameter); 
	    for (var i = 1; i < parameters.length; i++) {
		result.mergeLeft(cfgGenerator(parameters[i]));
	    }
	    result.mergeLeft(resolveInstr);
	} else
	    result = resolveInstr;

	var callInstr = new Cfg ({
	    type: 'CALL'
	});

	result.mergeLeft(callInstr);

	if (isVariadic) {
	    var vaendInstr = new Cfg ({
		type: 'VAEND'
	    });

	    result.mergeRight(vaendInstr);
	}

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return FunctionCall;
    });
});
