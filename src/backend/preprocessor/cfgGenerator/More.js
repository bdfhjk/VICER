define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;

    function More(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var notInstr = new Cfg ({
	    type: 'NOT'
	});
	var leqInstr = new Cfg ({
	    type: 'LEQ'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(leqInstr);
	result.mergeLeft(notInstr);

	result.type = null;

	return result;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return More;
    });
});
