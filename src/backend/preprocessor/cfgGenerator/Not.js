define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function Not(paramNode) {
	var value = cfgGenerator(paramNode.subexp);
	CfgHelper.toValOrPtr(value);

	if (value.type !== 'value') {
	    throw new Errors.TypeMismatch(
		value.type,
		'value',
		'NOT');
	}
	if (value.tvalue.type !== 'int') {
	    throw new Errors.TypeMismatch(
		value.tvalue.type,
		'int',
		'NOT');
	}

	var notInstr = new Cfg ({
	    type: 'NOT'
	});

	var result = value;
	result.mergeLeft(notInstr);

	result.type = 'value';
	result.tvalue = {
	    type: 'int'
	};

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Not;
    });
});
