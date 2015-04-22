define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;
    
    function Return(paramNode) {
	var expr = cfgGenerator(paramNode.rexpression);
	if (!expr) {
	    throw new Error('Something occured during processing node ' + paramNode);
	}
	CfgHelper.toValOrPtr(expr);

	var returnInstr = new Cfg ({
	    type: 'RETURN'
	});

	var result = expr;
	result.mergeLeft(returnInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Return;
    });
});
