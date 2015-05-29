define([
    '../Cfg',
    '../Errors',
    '../cfgHelper'
], function (Cfg, Errors, cfgHelper) {
    var cfgGenerator;

    var decl = {
	rexpression: {
	    lvalue: false
	}
    };
    
    function Return(paramNode) {
	var result;
	var expectedReturnType = paramNode.declaration.returns;

	if (paramNode.rexpression && cfgHelper.matchTypes({ type: 'void' }, expectedReturnType)) {
	    throw new Errors.TypeMismatch(
		expectedReturnType,
		'void'
	    );
	}

	var returnInstr = new Cfg ({
	    type: 'RETURN'
	});

	if (paramNode.rexpression) {
	    cfgHelper.init(cfgGenerator);
	    decl.rexpression.type = expectedReturnType;

	    var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);

	    result = compSubtrees.rexpression;
	    result.mergeLeft(returnInstr);
	} else {
	    result = returnInstr;
	}

	result.type = null;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Return;
    });
});
