define([
    'lodash',
    '../Errors',
    '../Cfg',
    '../cfgHelper'
], function (_, Errors, Cfg, cfgHelper) {
    var cfgGenerator;

    var decl = {
	left: {
	    lvalue: true,
	},
	right: {
	    lvalue: false
	}
    };
    
    function Assign(paramNode) {
	cfgHelper.init(cfgGenerator);
	var compSubtrees = cfgHelper.computeAndCheckSubtrees(paramNode, decl);
	var lvalue = compSubtrees.left;
	var rvalue = compSubtrees.right;

	if (!cfgHelper.matchTypes(lvalue.tvalue, rvalue.tvalue)) {
	    throw new Errors.TypeMismatch(
		Errors.prettyPrintTypes(lvalue.tvalue),
		Errors.prettyPrintTypes(rvalue.tvalue),
		paramNode
	    );
	}

	var assignInstr = new Cfg ({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(rvalue);
	result.mergeLeft(assignInstr);

	result.lvalue = false;
	result.tvalue = rvalue.tvalue;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Assign;
    });
});
