define([
    'lodash',
    '../Cfg'
], function (_, Cfg) {
    var cfgGenerator;
    
    function MinusAssign(paramNode) {
	var lvalue = cfgGenerator(paramNode.left);
	var value = cfgGenerator(paramNode.right);

	var fetchInstr = new Cfg ({
	    type: 'FETCH'
	});
	var subInstr = new Cfg ({
	    type: 'SUB'
	});
	var assignInstr = new Cfg ({
	    type: 'ASSIGN'
	});

	var result = lvalue;
	result.mergeLeft(lvalue);
	result.mergeLeft(fetchInstr);
	result.mergeLeft(rvalue);
	result.mergeLeft(subInstr);
	result.mergeLeft(assignInstr);

	return result;
    }

    return (function (_cfgGenerator) {
	cfgGenerator = _cfgGenerator;
	return MinusAssign;
    });
});
