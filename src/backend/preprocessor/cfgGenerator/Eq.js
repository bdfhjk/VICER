define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;

    function Eq(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var eqInstr = new Cfg ({
	    type: 'EQ',
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(eqInstr);

	result.type = null;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Eq;
    });
});
