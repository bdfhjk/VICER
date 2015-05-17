define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function Return(paramNode) {
	var expr = cfgGenerator(paramNode.rexpression);
	var return_tvalue = paramNode.return_tvalue;
	CfgHelper.toValOrPtr(expr);

	if (return_tvalue.type === 'concrete_type') {
	    if (expr.tvalue.type !== return_tvalue.name) {
		throw new Errors.TypeMismatch(
		    return_tvalue.name,
		    expr.tvalue.type,
		    'RETURN');
	    }
	} else if (expr.tvalue.of.type !== return_tvalue.tvalue.of.name) {
	    throw new Errors.TypeMismatch(
		return_tvalue.tvalue.of.name,
		expr.tvalue.of.type,
		'RETURN');
	}

	var returnInstr = new Cfg ({
	    type: 'RETURN'
	});

	var result = expr;
	result.mergeLeft(returnInstr);

	result.type = null;
	result.tvalue = null;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Return;
    });
});
