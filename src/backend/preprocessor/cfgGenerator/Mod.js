define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;

    function Mod(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	if (left.type !== 'value') {
	    throw new Errors.TypeMismatch(
		left.type,
		'value',
		'MOD');
	}
	if (left.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		left.tvalue.type,
		'int',
		'MOD');
	}
	if (right.type !== 'value') {
	    throw new Errors.TypeMismatch(
		right.type,
		'value',
		'MOD');
	}
	if (right.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		right.tvalue.type,
		'int',
		'MOD');
	}

	var modInstr = new Cfg ({
	    type: 'MOD'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(modInstr);

	result.type = 'value';
	result.tvalue = {
	    type: 'int'
	};

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Mod;
    });
});
