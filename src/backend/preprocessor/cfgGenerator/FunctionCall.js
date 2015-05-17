define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;

    function FunctionCall (paramNode) {
	var functionName = paramNode.name;
	var args = paramNode.declaration.param_tvalues;
	var returnType = paramNode.declaration.return_tvalue;
	var isVariadic = paramNode.declaration.args === 'varargs';
	var parameters = paramNode.parameters;
	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: functionName
	});
	var result;

	if (args.length !== 0 && (!parameters || parameters.length !== args.length)) {
	    throw new Errors.WrongArgNum(
		args.length,
		parameters ? parameters.length : 0,
		'CALL ' + functionName);
	}

	if (parameters && parameters.length > 0) {
	    var firstParameterDeclared = args[0];
	    var firstParameter = parameters[0];
	    result = cfgGenerator(firstParameter); 
	    CfgHelper.toValOrPtr(result);

	    if (firstParameterDeclared.type === 'concrete_type') {
		if (firstParameterDeclared.name !== result.tvalue.type) {
		    throw new Errors.TypeMismatch(
			firstParameterDeclared.name,
			result.tvalue.type,
			'CALL ' + functionName);
		}
	    } else {
		if (result.type === 'value') {
		    throw new Errors.TypeMismatch(
			'pointer || array',
			'value',
			'CALL ' + functionName);
		} else if (result.tvalue.of.type !== firstParameterDeclared.tvalue.name) {
		    throw new Errors.TypeMismatch(
			firstParameterDeclared.tvalue.name,
			result.tvalue.of.type,
			'CALL ' + functionName);
		}
	    }
	    
	    var generated, curParamDeclared;
	    for (var i = 1; i < parameters.length; i++) {
		curParamDeclared = args[i];
		generated = cfgGenerator(parameters[i]);
		CfgHelper.toValOrPtr(generated);

		if (curParamDeclared.type === 'concrete_type') {
		    if (curParamDeclared.name !== generated.tvalue.type) {
			throw new Errors.TypeMismatch(
			    curParamDeclared.name,
			    generated.tvalue.type,
			    'CALL ' + functionName);
		    }
		} else {
		    if (generated.type === 'value') {
			throw new Errors.TypeMismatch(
			    'pointer || array',
			    'value',
			    'CALL ' + functionName);
		    } else if (generated.tvalue.of.type !== curParamDeclared.tvalue.name) {
			throw new Errors.TypeMismatch(
			    curParamDeclared.tvalue.name,
			    generated.tvalue.of.type,
			    'CALL ' + functionName);
		    }
		}

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

	if (returnType.type === 'concrete_type') {
	    result.tvalue = {
		type: returnType.name
	    };
	} else {
	    result.tvalue = {
		type: returnType.type,
		of: {
		    type: returnType.tvalue.name
		}
	    };
	}
	result.type = CfgHelper.getNodeVal(paramNode.declaration);

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return FunctionCall;
    });
});
