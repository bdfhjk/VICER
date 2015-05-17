define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function LogicalOr (paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);
	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	if (left.type !== 'value' || left.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		left.tvalue.type,
		'int',
		'LOGICAL_OR');
	}
	if (right.type !== 'value' || right.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		right.tvalue.type,
		'int',
		'LOGICAL_OR');
	}

	var orInstr = new Cfg ({
	    type: 'OR',
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(orInstr);

	result.type = 'value';
	result.tvalue = {
	    type: 'int'
	};

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return LogicalOr;
    });
});
