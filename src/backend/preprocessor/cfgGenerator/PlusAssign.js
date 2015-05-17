define([
    '../Cfg',
    '../CfgHelper'
], function (Cfg, CfgHelper) {
    var cfgGenerator;
    
    function PlusAssign(paramNode) {
	var lvalue = cfgGenerator(paramNode.left);
	var lrvalue = lvalue.copy();
	var rvalue = cfgGenerator(paramNode.right);

	CfgHelper.toValOrPtr(lrvalue);
	CfgHelper.toValOrPtr(rvalue);

	var addInstr = new Cfg ({
	    type: 'ADD'
	});
	var assignInstr = new Cfg ({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(lrvalue);
	result.mergeLeft(rvalue);
	result.mergeLeft(addInstr);
	result.mergeLeft(assignInstr);

	result.type = null;
	result.tvalue = null;

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return PlusAssign;
    });
});
