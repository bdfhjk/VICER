define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;
    
    function Not(paramNode) {
	var value = cfgGenerator(paramNode.subexp);
	CfgHelper.toValOrPtr(value);

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
