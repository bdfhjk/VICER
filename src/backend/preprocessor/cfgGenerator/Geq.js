define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;

    function Geq(paramNode) {
	var left = cfgGenerator(paramNode.left);
	var right = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(left);
	CfgHelper.toValOrPtr(right);

	var geqInstr = new Cfg ({
	    type: 'GEQ'
	});

	var result = left;
	result.mergeLeft(right);
	result.mergeLeft(geqInstr);

	result.type = 'value';
	result.tvalue = {
	    type: 'int'
	};

	return left;
    }

    return (function(_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Geq;
    });
});
