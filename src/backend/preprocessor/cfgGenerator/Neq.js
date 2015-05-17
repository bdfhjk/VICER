define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;

    function Neq(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var notInstr = new Cfg ({
	    type: 'NOT'
	});
	var eqInstr = new Cfg ({
	    type: 'EQ'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(eqInstr);
	result.mergeLeft(notInstr);

	result.type = 'value';
	result.tvalue = {
	    type: 'int'
	};

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Neq;
    });
});
