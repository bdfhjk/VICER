define([
    'lodash',
    '../Cfg',
    '../CfgHelper'
], function (_, Cfg, CfgHelper) {
    var cfgGenerator;
    
    function Assign(paramNode) {
	var lvalue = cfgGenerator(paramNode.left);
	var rvalue = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(rvalue);

	var assignInstr = new Cfg ({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(rvalue);
	result.mergeLeft(assignInstr);

	result.type = null;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Assign;
    });
});
