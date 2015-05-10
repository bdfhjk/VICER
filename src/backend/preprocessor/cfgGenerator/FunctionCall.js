define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;

    function FunctionCall (paramNode) {
	var functionName = paramNode.name;
	var isVariadic = paramNode.declaration.args === 'varargs';
	var parameters = paramNode.parameters;
	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: functionName
	});
	var result;

	if (parameters && parameters.length > 0) {
	    var firstParameter = parameters[0];
	    result = cfgGenerator(firstParameter); 
	    CfgHelper.toValOrPtr(result);
	    var generated;
	    for (var i = 1; i < parameters.length; i++) {
		generated = cfgGenerator(parameters[i]);
		CfgHelper.toValOrPtr(generated);
		result.mergeLeft(generated);
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

	result.type = CfgHelper.getNodeVal(paramNode.declaration);

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return FunctionCall;
    });
});
