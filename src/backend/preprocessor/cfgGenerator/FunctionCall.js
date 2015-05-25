define([
    'lodash',
    '../Cfg',
    '../Errors',
    '../cfgHelper'
], function (_, Cfg, Errors, cfgHelper) {
    var cfgGenerator;

    function FunctionCall (paramNode) {
	var isVariadic = paramNode.declaration.args === 'varargs';
	var functionName = paramNode.declaration.name;
	var args = paramNode.declaration.param_tvalues;
	var parameters = paramNode.parameters;
	var resolveInstr = new Cfg ({
	    type: 'RESOLVE',
	    param: functionName
	});
	var result = new Cfg ({
	    type: 'NOOP'
	});

	var paramNum = parameters ? parameters.length : 0;
	var argNum = args ? args.length : 0;

	if (!isVariadic && paramNum !== argNum) {
	    throw new Errors.WrongArgNum();
	}

	var paramsDecls = _.zip(parameters, args);
	_.each(paramsDecls, function (paramDecl) {
	    var computedParam = cfgHelper.computeAndCheckType(
		paramDecl[1], // type
		false,         // lvalue
		paramDecl[0]  // node
	    );

	    result.mergeLeft(computedParam);
	});

	result.mergeLeft(resolveInstr);

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

	result.tvalue = paramNode.declaration.return_tvalue;
	result.lvalue = false;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return FunctionCall;
    });
});
