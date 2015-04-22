define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;

    function Leq(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var leqInstr = new Cfg ({
	    type: 'LEQ'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(leqInstr);

	result.type = null;

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Leq;
    });
});
