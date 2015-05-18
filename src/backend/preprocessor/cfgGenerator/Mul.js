define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;

    function Mul(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	if (left.type !== 'value') {
	    throw new Errors.TypeMismatch(
		left.type,
		'value',
		'MUL');
	}
	if (left.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		left.tvalue.type,
		'int',
		'MUL');
	}
	if (right.type !== 'value') {
	    throw new Errors.TypeMismatch(
		right.type,
		'value',
		'MUL');
	}
	if (right.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		right.tvalue.type,
		'int',
		'MUL');
	}

	var mulInstr = new Cfg ({
	    type: 'MUL'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(mulInstr);

	result.type = 'value';
	result.tvalue = {
	    type: 'int'
	};

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Mul;
    });
});
