define([
    '../Cfg',
    '../CfgHelper',
    '../Errors'
], function (Cfg, CfgHelper, Errors) {
    var cfgGenerator;
    
    function Deref(paramNode) {
	var location = cfgGenerator(paramNode.subexp);
	CfgHelper.toValOrPtr(location);

	if (location.type !== 'pointer') {
	    throw new Errors.TypeMismatch(
		'pointer',
		location.value,
		'DEREF');
	}
	if (location.tvalue.type !== 'pointer' && location.tvalue.type !== 'array') {
	    throw new Errors.TypeMismatch(
		'pointer || array',
		location.tvalue.type,
		'DEREF'
	    );
	}

	var derefInstr = new Cfg ({
	    type: 'DEREF'
	});

	var result = location;
	result.mergeLeft(derefInstr);

	result.type = 'locVal';
	result.tvalue = location.tvalue.of;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Deref;
    });
});
