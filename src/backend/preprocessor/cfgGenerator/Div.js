define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;

    function Div(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	if (left.type !== 'value') {
	    throw new Errors.TypeMismatch(
		left.type,
		'value',
		'DIV');
	}
	if (left.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		left.tvalue.type,
		'int',
		'DIV');
	}
	if (right.type !== 'value') {
	    throw new Errors.TypeMismatch(
		right.type,
		'value',
		'DIV');
	}
	if (right.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		right.tvalue.type,
		'int',
		'DIV');
	}

	var divInstr = new Cfg ({
	    type: 'DIV'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(divInstr);

	result.type = 'value';
	result.tvalue = {
	    type: 'int'
	};

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Div;
    });
});
