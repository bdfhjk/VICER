define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;

    function Subscript(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var leftFirst = left.type === 'pointer';

	var paddInstr = new Cfg ({
	    type: 'PADD'
	});
	var derefInstr = new Cfg({
	    type: 'DEREF'
	});

	var result = left;
	if (leftFirst) {
	    result.mergeLeft(right);
	} else {
	    result.mergeRight(right);
	}
	result.mergeLeft(paddInstr);
	result.mergeLeft(derefInstr);

	result.type = 'locVal';

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Subscript;
    });
});
