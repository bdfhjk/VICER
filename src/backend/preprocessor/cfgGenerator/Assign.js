define([
    'lodash',
    '../Cfg'
], function (_, Cfg) {
    var cfgGenerator;
    
    function Assign(paramNode) {
	var lvalue = cfgGenerator(paramNode.left);
	var rvalue = cfgGenerator(paramNode.right);

	var assignInstr = new Cfg ({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(rvalue);
	result.mergeLeft(assignInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return Assign;
    });
});
